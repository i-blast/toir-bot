/**
 * Приоритет заявки. Enum-like class.
 */
export default class OrderPriority {
    /** Низкая. */
    static readonly LOW = new OrderPriority('LOW', 'Низкая');
    /** Средняя. */
    static readonly MIDDLE = new OrderPriority('MIDDLE', 'Средняя');
    /** Высокая. */
    static readonly HIGH = new OrderPriority('HIGH', 'Высокая');
    /** Критическая. */
    static readonly CRITICAL = new OrderPriority('CRITICAL', 'Критическая');

    /** Имя enum-объекта. */
    private readonly name: string;
    /** Значение поля в таблице в столбце "Критичность". */
    private readonly tableValue: string;

    private constructor(name: string, tableValue: string) {
        this.name = name;
        this.tableValue = tableValue;
    }

    /**
     * @returns массив констант OrderPriority в порядке их объявления
     */
    static get values(): OrderPriority[] {
        return [this.LOW, this.MIDDLE, this.HIGH, this.CRITICAL];
    }

    /**
     * @param name имя константы
     * @throws RangeError, если передано имя, для которого нет соответствующей константы
     * @returns соответствующую константу
     */
    static byName(name: string): OrderPriority {
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
    static byTableValue(tableValue: string): OrderPriority {
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
     * @return значение поля в таблице в столбце "Критичность"
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
