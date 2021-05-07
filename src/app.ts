import connectToDatabase from './database/connect';
import logger from './util/logger';
import { Order } from './order/order';
import OrderStatus from './order/order.status';
import { createOrder, findOrderByNumber } from './order/order.service';

connectToDatabase();
/*new ToirBot().startBot();*/

try {
    createOrder({
        number: 'SMT-69343241238',
        status: OrderStatus.PENDING,
        source: 'ВМС',
        object: 'Добрянка 1 Радищева (а)',
        branchOffice: 'Пермь Запад',
        responsiblePerson: 'Иванов Иван Иванович',
        vmsRequestNumber: 'REQ34059834059',
        timestampCreated: new Date(),
        timestampDetection: new Date(),
        timestampLimit: new Date(),
        description: 'описание',
    } as Order)
        .then((order) => logger.debug('Created ' + JSON.stringify(order, null, 2)))
        .catch((error) => logger.error(error));

    findOrderByNumber('SMT-6934233341238').then((order) => {
        if (order) {
            logger.info(`Order found: #${order.number}; order source is ${order.getSource().getName()}`);
        } else {
            logger.info('Order not found');
        }
    });
} catch (exc) {
    logger.error(exc);
}
