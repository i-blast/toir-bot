const logger = require('../utility/logger.js');
const toirParser = require('../toirParser.js');
const {Telegraf} = require('telegraf');

async function startBot() {
    const bot = new Telegraf(process.env.BOT_TOKEN);

    bot.command('fetch', async ctx => {
        // const screenPath = config.get('screenPath');

        const ordersData = await toirParser.getOrdersData();
        await ctx.reply(ordersData);
        // await ctx.replyWithDocument({
        //     source: `./${screenPath}`,
        // }, {
        //     caption: url
        // });
    });

    await bot.launch();
    logger.info('Bot started');

    // Enable graceful stop // some kind of overglorified comment?
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}


module.exports.startBot = startBot;
