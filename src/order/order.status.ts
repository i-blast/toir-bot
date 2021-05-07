/**
 * Статус заявки. Enum-like class.
 */
class OrderStatus {
    /** Решена. */
    static readonly SOLVED = new OrderStatus('SOLVED', 'Решена');
    /** Назначена. */
    static readonly ASSIGNED = new OrderStatus('ASSIGNED', 'Назначена');
    /** Отменена. */
    static readonly CANCELLED = new OrderStatus('CANCELLED', 'Отменена');
    /** В ожидании. */
    static readonly PENDING = new OrderStatus('PENDING', 'В ожидании');

    private constructor(
        /** Имя enum-объекта. */
        private readonly name: string,
        /** Значение поля в таблице в столбце "Статус". */
        private readonly tableValue: string,
    ) {}

    /**
     * @returns array of OrderStatus instances in the order they're declared
     */
    static get values(): OrderStatus[] {
        return [this.SOLVED, this.ASSIGNED, this.CANCELLED, this.PENDING];
    }

    /**
     * Converts a name to its corresponding Enum instance.
     *
     * @param name the name to convert to Enum
     * @throws RangeError, if a name that has no corresponding Enum value was passed
     * @returns the matching Enum
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
     * @param tableValue the tableValue to convert to Enum
     * @throws RangeError, if a tableValue that has no corresponding Enum value was passed
     * @returns the matching Enum
     */
    static byTableValue(tableValue: string): OrderStatus {
        // Works assuming the name property of the enum is identical to the variable's name.
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
     * @returns JSON representation
     */
    public toJSON() {
        return this.getName();
    }
}

export default OrderStatus;
