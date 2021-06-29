import { ToirParser } from './toir.parser';
import logger from '../util/logger';
import { Telegraf } from 'telegraf';

/**
 * Telegram-бот, анализирующий заявки.
 *
 * Парсит html-таблицу с заявками, сохраняет новые заявки в БД и рассылает уведомления о новых заявках.
 */
class ToirBot {
    private parser?: ToirParser;

    /**
     * Запуск сервиса.
     */
    public async startBot() {
        const bot = new Telegraf(`${process.env.BOT_TOKEN}`);

        this.parser = new ToirParser();
        try {
            await this.parser.configure();
        } catch (exc) {
            logger.error('Error while configuring web parser', exc);
            throw exc;
        }
        logger.debug('Driver configured');
        try {
            await this.parser.goToOrdersTable();
        } catch (exc) {
            logger.error('Error while navigating to orders table view', exc);
            throw exc;
        }
        logger.debug('Bot navigated to orders table view');

        bot.command('fetch', async (ctx) => {
            // const screenPath = config.get('screenPath');
            if (!this.parser) throw new Error('Web-parser broken');

            const ordersData = await this.parser.getOrdersData();
            logger.debug('Orders data fetched');
            const ordersDataToReply = ordersData;
            while (ordersDataToReply.length > 0) {
                const messagePart = ordersDataToReply.splice(0, 5);
                await ctx.reply(JSON.stringify(messagePart, null, 4));
            }
            logger.debug('Orders data sent');
        });

        await bot.launch();
        logger.info('Bot started successfully');

        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
    }
}

export default ToirBot;
