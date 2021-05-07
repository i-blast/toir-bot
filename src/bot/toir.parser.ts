import { Browser, chromium, Page } from 'playwright';
import logger from '../util/logger';
import { Order } from '../order/order';
import OrderStatus from '../order/order.status';

/**
 * Парсер для системы ГлазТоира на основе chromium webdriver.
 */
export class ToirParser {
    /** */
    private browser?: Browser;
    /** */
    private page?: Page;

    /**
     * Настройка парсера.
     */
    public async configure(): Promise<void> {
        // Конфигурирование chromium драйвера
        this.browser = await chromium.launch();
        const browserCtx = await this.browser.newContext({
            // http basic аутентификация
            httpCredentials: { username: `${process.env.HTTP_LOGIN}`, password: `${process.env.HTTP_PASSWORD}` },
        });
        this.page = await browserCtx.newPage();
        await this.page.setViewportSize({
            width: 1280,
            height: 720,
        });

        // await page.close();
        // await browser.close();
    }

    /**
     * Извлечение данных по заявкам из html таблицы.
     */
    public async getOrdersData(): Promise<Array<Order>> {
        // const screenPath = config.get('screenPath');
        // Парсинг таблицы с данными
        if (!this.page) throw new Error('Parser is in an inconsistent state.');
        const TABLE_ROWS_SELECTOR = 'div[id$="_Список"].grid div.gridBody > .gridLine';
        const tableData = await this.page.$$eval(TABLE_ROWS_SELECTOR, (gridRows: (SVGElement | HTMLElement)[]) => {
            return gridRows.map((row: SVGElement | HTMLElement) => {
                return {
                    number: (row.children[2] as HTMLElement).innerText.trim(),
                    status: OrderStatus.byTableValue((row.children[6] as HTMLElement).innerText.trim()),
                    source: (row.children[9] as HTMLElement).innerText.trim(),
                    object: (row.children[1] as HTMLElement).innerText.trim(),
                    timestampLimit: new Date((row.children[3] as HTMLElement).innerText.trim()),
                    timestampDetection: new Date((row.children[4] as HTMLElement).innerText.trim()),
                    timestampCreated: new Date((row.children[5] as HTMLElement).innerText.trim()),
                    vmsRequestNumber: (row.children[7] as HTMLElement).innerText.trim(),
                    responsiblePerson: (row.children[8] as HTMLElement).innerText.trim(),
                    branchOffice: (row.children[10] as HTMLElement).innerText.trim(),
                    description: '',
                } as Order;
            });
        });
        logger.debug(`Orders fetched number: ${tableData.length}`);
        return tableData;
    }

    /**
     *  Переход к таблице с данными заявок.
     */
    public async goToOrdersTable(): Promise<void> {
        if (!this.page) throw new Error('Parser is in an inconsistent state.');
        await this.page.goto(`${process.env.SERVICE_HOST}?sysver=${process.env.SYSTEM_VERSION}`);
        logger.debug('Http-basic auth ok.');
        await this.login();
        logger.debug('Form auth ok.');
        await this.goToOrders();
    }

    /**
     *  Аутентификация через форму.
     */
    private async login(): Promise<void> {
        if (!this.page) throw new Error('Parser is in an inconsistent state.');
        await this.page.waitForSelector('#userName');
        await this.page.fill('#userName', `${process.env.FORM_LOGIN}`);
        await this.page.fill('#userPassword', `${process.env.FORM_PASSWORD}`);
        await this.page.click('#okButton');
        // await page.screenshot({path: screenPath});
    }

    private async goToOrders(): Promise<void> {
        if (!this.page) throw new Error('Parser is in an inconsistent state.');
        // Нажатие кнопки "Смета ремонта (Заявка на ремонт)"
        await this.page.waitForSelector('#themesCell_theme_1');
        await this.page.click('#themesCell_theme_1');
        // Нажатие кнопки "Управление нарядами и работами"
        await this.page.waitForSelector('#themesCell_theme_1');
        await this.page.click('#cmd_0_0_txt');
        // Ожидание таблицы и нажатие флажка "Только незакрытые заявки"
        await this.page.waitForSelector('div[id^="grid_"][id$="_Список"]');
        await this.page.waitForSelector('div[id^="form"][id$="_ТолькоНезакрытые"]');
        await this.page.click('div[id^="form"][id$="_ТолькоНезакрытые"]');
    }
}
