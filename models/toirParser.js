const playwright = require('playwright');
const logger = require('./utility/logger.js');

const SERVICE_PAGE = 'https://v00toirweb.corp.tander.ru/toirWC/ru_RU/mainform.html';

async function getOrdersData() {
    // const screenPath = config.get('screenPath');

    // Конфигурирование драйвера
    const browser = await playwright.chromium.launch();
    const ctx = await browser.newContext({
        // http basic аутентификация
        httpCredentials: {username: process.env.HTTP_LOGIN, password: process.env.HTTP_PASSWORD}
    });
    const page = await ctx.newPage();
    await page.setViewportSize({
        width: 1280,
        height: 720
    });

    // Получение данных из таблицы
    try {
        await page.goto(SERVICE_PAGE + "?sysver=" + process.env.SYSTEM_VERSION);

        // Аутентификация через форму
        await page.waitForSelector('#userName');
        await page.fill('#userName', process.env.FORM_LOGIN);
        await page.fill('#userPassword', process.env.FORM_PASSWORD);
        await page.click('#okButton');
        // await page.screenshot({path: screenPath});

        // Нажатие кнопки "Смета ремонта (Заявка на ремонт)"
        await page.waitForSelector('#themesCell_theme_1');
        await page.click('#themesCell_theme_1');

        // Нажатие кнопки "Управление нарядами и работами"
        await page.waitForSelector('#themesCell_theme_1');
        await page.click('#cmd_0_0_txt');

        // Ожидание таблицы и нажатие флажка "Только незакрытые заявки"
        await page.waitForSelector('div[id^="grid_"][id$="_Список"]');
        await page.waitForSelector('div[id^="form"][id$="_ТолькоНезакрытые"]');
        await page.click('div[id^="form"][id$="_ТолькоНезакрытые"]');

        // Парсинг таблицы с данными
        const tableData = await page.$$eval('div[id$="_Список"].grid div.gridBody > .gridLine', gridRows => {
            return gridRows.map(row => {
                const cells = row.children;
                return {
                    priority: cells[0].innerText,
                    requestObject: cells[1].innerText,
                    requestNumber: cells[2].innerText,
                    dateLimit: cells[3].innerText,
                    date: cells[4].innerText,
                    dateCreated: cells[5].innerText,
                    requestStatus: cells[6].innerText,
                    vmsRequestNumber: cells[7].innerText,
                    responsiblePerson: cells[8].innerText,
                    sourceSystem: cells[9].innerText,
                    branchOffice: cells[10].innerText
                };
            });
        });
        logger.debug(tableData);

        return tableData;
    } catch (e) {
        logger.error('[getOrdersData] error:');
        logger.error(e);
    }

    await page.close();
    await browser.close();
}

module.exports.getOrdersData = getOrdersData;
