const logger = require('../utility/logger.js');
const toirParser = require('../toirParser.js');
const {Telegraf} = require('telegraf');

async function startBot() {
    const bot = new Telegraf(process.env.BOT_TOKEN);

    bot.command('fetch', async ctx => {
        // const screenPath = config.get('screenPath');

        const ordersData = await toirParser.getOrdersData();
        let ordersDataToReply = ordersData;
        while (ordersDataToReply.length > 0) {
            // Шлем по 5 заявок.
            const messagePart = ordersDataToReply.splice(0, 5);
            await ctx.reply(JSON.stringify(messagePart, null, 2));
        }

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
