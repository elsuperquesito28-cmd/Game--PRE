export default class Edificio {
    type;
    quantity;
    cost;
    amountImprovement;
    maxLevel;
    capacity;
    level;
    id;
    constructor(values) {
        const { type, quantity, cost, amountImprovement, maxLevel, capacity, level, id } = values;
        this.type = type;
        this.quantity = quantity;
        this.cost = cost;
        this.amountImprovement = amountImprovement;
        this.maxLevel = maxLevel;
        this.capacity = capacity;
        this.level = level;
        this.id = id;
    }
    limit() {
        return this.quantity * this.capacity;
    }
}
