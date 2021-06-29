import { getModelForClass, prop, queryMethod, ReturnModelType } from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import OrderStatus from './order.status';
import OrderSource, { OBJECT_AUDIT_NOTES_SECTION } from './order.source';
import OrderPriority from './order.priority';
import RepairType from './repair.type';

/**
 *  Модель хранимой заявки на ремонт оборудования.
 */
@queryMethod(findByNumber)
export class Order {
    /** Номер заявки. */
    @prop({ required: true, unique: true, index: true })
    public number!: string;
    /** Статус заявки. */
    @prop({
        required: true,
        type: String,
        get: (asString: string) => OrderStatus.byName(asString),
        set: (orderStatus: OrderStatus) => orderStatus.getName(),
    })
    public status!: OrderStatus;
    /** Приоритет заявки. */
    @prop({
        required: true,
        type: String,
        get: (asString: string) => OrderPriority.byName(asString),
        set: (orderPriority: OrderPriority) => orderPriority.getName(),
    })
    public priority!: OrderPriority;
    /** Источник заявки. */
    @prop({ required: true })
    public source!: string;
    /** Объект заявки. */
    @prop({ required: true })
    public object!: string;
    /** Дата выполнения до (для исполнителя). */
    @prop({ required: true })
    public timestampLimit!: Date;
    /** Дата обнаружения. */
    @prop({ required: true })
    public timestampDetection!: Date;
    /** Объект заявки. */
    @prop({ required: true })
    public timestampCreated!: Date;
    /** Номер запроса. */
    @prop({ required: false })
    public requestNumber?: string;
    /** Ответственное лицо. */
    @prop({ required: true })
    public responsiblePerson!: string;
    /** Филиал. */
    @prop({ required: true })
    public branchOffice!: string;
    /** Описание. */
    @prop({ required: true })
    public description!: string;
    /** Тип ремонта. */
    @prop({
        required: true,
        type: String,
        get: (asString: string) => RepairType.byName(asString),
        set: (repairType: RepairType) => repairType.getName(),
    })
    public repairType!: RepairType;

    public constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }

    /**
     * @returns тип источника заявки
     */
    public getSource(): OrderSource {
        // TODO выразить согласно постановке
        let source;
        if (this.description.includes(OBJECT_AUDIT_NOTES_SECTION)) {
            source = OrderSource.AUDIT;
        } else if (this.source.includes(OrderSource.GK_TASK.getTableValue())) {
            source = OrderSource.GK_TASK;
        } else if (!this.requestNumber || this.requestNumber.length === 0) {
            source = OrderSource.AUTO;
        } else {
            source = OrderSource.COMMON;
        }
        return source;
    }
}

interface QueryHelpers {
    findByNumber: AsQueryMethod<typeof findByNumber>;
}

function findByNumber(this: ReturnModelType<typeof Order, QueryHelpers>, number: string) {
    return this.findOne({ number });
}

export const OrderModel = getModelForClass<typeof Order, QueryHelpers>(Order);
