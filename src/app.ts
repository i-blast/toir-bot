import 'reflect-metadata';
import connectToDatabase from './database/connect';
import { Order } from './order/order';
import OrderPriority from './order/order.priority';
import OrderStatus from './order/order.status';
import RepairType from './order/repair.type';
import logger from './util/logger';
import { createOrder, findOrderByNumber } from './order/order.service';

connectToDatabase();
// new ToirBot().startBot();

const order = new Order({
    number: 'SMT-69343241238',
    priority: OrderPriority.MIDDLE,
    status: OrderStatus.PENDING,
    source: 'ВМС',
    object: 'Добрянка 1 Радищева (а)',
    branchOffice: 'Пермь Запад',
    responsiblePerson: 'Иванов Иван Иванович',
    requestNumber: 'REQ34059834059',
    timestampCreated: new Date(),
    timestampDetection: new Date(),
    timestampLimit: new Date(),
    description: 'описание',
    repairType: RepairType.BUILDINGS_CONSTRUCTIONS,
});
try {
    createOrder(order)
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
