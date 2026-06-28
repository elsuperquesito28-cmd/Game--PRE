export default class Edificio {
    type: string;
    quantity: number;
    cost: number;
    amountImprovement: number;
    maxLevel: number;
    capacity: number;
    level: number;
    id: string;

    constructor(values: Record<string, any>) {
        const { type, quantity, cost, amountImprovement, maxLevel, capacity, level, id } = values;
        this.type = type;
        this.quantity = quantity;
        this.cost = cost;
        this.amountImprovement = amountImprovement;
        this.maxLevel = maxLevel;
        this.capacity = capacity;
        this.level = level;
        this.id = id
    }
    limit() {
        return this.quantity * this.capacity;
    }
}
