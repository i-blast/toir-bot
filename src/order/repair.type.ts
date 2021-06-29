/**
 * Тип ремонта. Enum-like class.
 */
export default class RepairType {
    /** Холодильное оборудование. */
    static readonly REFRIGERATION_EQUIPMENT = new RepairType('REFRIGERATION_EQUIPMENT', 'Холодильное оборудование');
    /** Технологическое оборудование. */
    static readonly TECHNOLOGICAL_EQUIPMENT = new RepairType('TECHNOLOGICAL_EQUIPMENT', 'Технологическое оборудование');
    /** Система вентиляции. */
    static readonly VENTILATION_SYSTEM = new RepairType('VENTILATION_SYSTEM', 'Система вентиляции');
    /** Система кондиционирования. */
    static readonly AIR_CONDITIONING_SYSTEM = new RepairType('AIR_CONDITIONING_SYSTEM', 'Система кондиционирования');
    /** Электроснабжение. */
    static readonly POWER_SUPPLY = new RepairType('POWER_SUPPLY', 'Электроснабжение');
    /** Здания и сооружения. */
    static readonly BUILDINGS_CONSTRUCTIONS = new RepairType('BUILDINGS_CONSTRUCTIONS', 'Здания и сооружения');

    /** Имя enum-объекта. */
    private readonly name: string;
    /** Значение поля в таблице в столбце "Направление". */
    private readonly tableValue: string;

    private constructor(name: string, tableValue: string) {
        this.name = name;
        this.tableValue = tableValue;
    }

    /**
     * @returns массив констант RepairType в порядке их объявления
     */
    static get values(): RepairType[] {
        return [
            this.REFRIGERATION_EQUIPMENT,
            this.TECHNOLOGICAL_EQUIPMENT,
            this.VENTILATION_SYSTEM,
            this.AIR_CONDITIONING_SYSTEM,
            this.POWER_SUPPLY,
            this.BUILDINGS_CONSTRUCTIONS,
        ];
    }

    /**
     * @param name имя константы
     * @throws RangeError, если передано имя, для которого нет соответствующей константы
     * @returns соответствующую константу
     */
    static byName(name: string): RepairType {
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
    static byTableValue(tableValue: string): RepairType {
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
     * @return значение поля в таблице в столбце "Направление"
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
