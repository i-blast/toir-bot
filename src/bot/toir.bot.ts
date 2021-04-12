import { ToirDriver } from './toir.driver';
import logger from '../util/logger';
import { Telegraf } from 'telegraf';

export class ToirBot {
    private driver?: ToirDriver;

    /**
     * Запуск сервиса.
     */
    public async startBot() {
        const bot = new Telegraf(`${process.env.BOT_TOKEN}`);

        this.driver = new ToirDriver();
        try {
            await this.driver.configure();
        } catch (exc) {
            logger.error('Error while configuring web driver', exc);
            throw exc;
        }
        logger.debug('Driver configured');
        try {
            await this.driver.goToOrdersTable();
        } catch (exc) {
            logger.error('Error while navigating to orders table view', exc);
            throw exc;
        }
        logger.debug('Bot navigated to orders table view');

        bot.command('fetch', async (ctx) => {
            // const screenPath = config.get('screenPath');
            if (!this.driver) throw new Error('Web-driver broken');

            const ordersData = await this.driver.getOrdersData();
            logger.debug('Orders data fetched');
            const ordersDataToReply = ordersData;
            while (ordersDataToReply.length > 0) {
                const messagePart = ordersDataToReply.splice(0, 5);
                await ctx.reply(JSON.stringify(messagePart, null, 4));
            }
            logger.debug('Orders data sent');
            // await ctx.replyWithDocument({
            //     source: `./${screenPath}`,
            // }, {
            //     caption: url
            // });
        });

        await bot.launch();
        logger.info('Bot started successfully');

        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
    }
}

export default ToirBot;
