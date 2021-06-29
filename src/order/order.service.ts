import { CreateQuery } from 'mongoose';
import { Order, OrderModel } from './order';

/**
 * @param order - сохраняет в БД новую заявку
 */
export async function createOrder(order: CreateQuery<Order>) {
    return OrderModel.create(order);
}

/**
 * @param orderNumber - номер заявки
 * @returns заявку
 */
export async function findOrderByNumber(orderNumber: string) {
    return OrderModel.findOne().findByNumber(orderNumber).exec();
}
