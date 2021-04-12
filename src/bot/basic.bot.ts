import logger from '../util/logger';
import { Telegraf } from 'telegraf';

export async function startBot() {
    const bot = new Telegraf(process.env.BOT_TOKEN || '');

    bot.start((ctx) => ctx.reply('Welcome'));
    bot.help((ctx) => ctx.reply('Send me a sticker'));
    bot.on('sticker', (ctx) => ctx.reply('👍'));
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    await bot.launch();
    logger.info('Bot started');

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
