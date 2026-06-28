export default class Edificio {
    constructor(values) {
        const { type, quantity, cost, amountImprovement, maxLevel, capacity, level } = values;
        this.type = type;
        this.quantity = quantity;
        this.cost = cost;
        this.amountImprovement = amountImprovement;
        this.limit = maxLevel;
        this.capacity = capacity;
        this.level = level;
    }
    limitTotal() {
        return this.quantity * this.capacity;
    }
}
