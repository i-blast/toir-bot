/**
 * Источник заявки. Enum-like class.
 */
class OrderSource {
    /** Обычная. */
    static readonly COMMON = new OrderSource('COMMON', 'ВМС');
    /** Заявка-аудит. */
    static readonly AUDIT = new OrderSource('AUDIT', 'ВМС');
    /** Автозаявка. */
    static readonly AUTO = new OrderSource('AUTO', 'ВМС');
    /** Спецзаявка с длительным сроком. */
    static readonly GK_TASK = new OrderSource('GK_TASK', 'Задача ГК');

    private constructor(
        /** Имя enum-объекта. */
        private readonly name: string,
        /** Значение поля в таблице в столбце "Источник". */
        private readonly tableValue: string,
    ) {}

    /**
     * @returns array of OrderSource instances in the order they're declared
     */
    static get values(): OrderSource[] {
        return [this.COMMON, this.AUDIT, this.AUTO, this.GK_TASK];
    }

    /**
     * @param name the name to convert to Enum
     * @throws RangeError, if a name that has no corresponding Enum value was passed
     * @returns the matching Enum
     */
    static byName(name: string): OrderSource {
        const value = (this as any)[name];
        if (value) return value;

        throw new RangeError(
            `Illegal argument passed to fromString(): ${name} does not correspond to any instance of the enum ${
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
     * @return значение поля в таблице в столбце "Источник"
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

export const OBJECT_AUDIT_NOTES_SECTION = 'Замечания по итогу аудита объекта';

export default OrderSource;
