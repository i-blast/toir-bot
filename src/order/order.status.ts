/**
 * Статус заявки. Enum-like class.
 */
export default class OrderStatus {
    /** Решена. */
    static readonly SOLVED = new OrderStatus('SOLVED', 'Решена');
    /** Назначена. */
    static readonly ASSIGNED = new OrderStatus('ASSIGNED', 'Назначена');
    /** Отменена. */
    static readonly CANCELLED = new OrderStatus('CANCELLED', 'Отменена');
    /** В ожидании. */
    static readonly PENDING = new OrderStatus('PENDING', 'В ожидании');

    /** Имя enum-объекта. */
    private readonly name: string;
    /** Значение поля в таблице в столбце "Статус". */
    private readonly tableValue: string;

    private constructor(name: string, tableValue: string) {
        this.name = name;
        this.tableValue = tableValue;
    }

    /**
     * @returns массив констант OrderStatus в порядке их объявления
     */
    static get values(): OrderStatus[] {
        return [this.SOLVED, this.ASSIGNED, this.CANCELLED, this.PENDING];
    }

    /**
     * @param name имя константы
     * @throws RangeError, если передано имя, для которого нет соответствующей константы
     * @returns соответствующую константу
     */
    static byName(name: string): OrderStatus {
        // Works assuming the name property of the enum is identical to the variable's name.
        const value = (this as any)[name];
        if (value) return value;

        throw new RangeError(
            `Illegal argument passed to fromString(): ${name} does not correspond to any instance of the enum ${
                (this as any).prototype.constructor.name
            }`,
        );
    }

    /**
     * @param tableValue значение из таблицы системы
     * @throws RangeError, если передано значение поля таблицы, для которого нет соответствующей константы
     * @returns соответствующую константу
     */
    static byTableValue(tableValue: string): OrderStatus {
        const value = (this as any)[tableValue];
        if (value) return value;

        throw new RangeError(
            `Illegal argument passed to fromString(): ${tableValue} does not correspond to any instance of the enum ${
                (this as any).prototype.constructor.name
            }`,
        );
    }

    /**
     * @returns имя enum-константы
     */
    public getName() {
        return this.name;
    }

    /**
     * @return значение поля в таблице в столбце "Статус"
     */
    public getTableValue() {
        return this.tableValue;
    }

    /**
     * @returns JSON-представление
     */
    public toJSON() {
        return this.getName();
    }
}
