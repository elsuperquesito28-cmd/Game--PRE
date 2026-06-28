export default class Herramienta {
    type;
    cost;
    costImprovement;
    value;
    efficiency;
    fortune;
    maxLevel;
    level;
    id;
    probability;
    availability;
    constructor(values) {
        const { type, cost, costImprovement, value, efficiency, fortune, maxLevel, level, id, probability, availability } = values;
        this.type = type;
        this.cost = cost;
        this.costImprovement = costImprovement;
        this.value = value;
        this.efficiency = efficiency;
        this.fortune = fortune;
        this.maxLevel = maxLevel;
        this.level = level;
        this.id = id;
        this.probability = probability;
        this.availability = availability;
    }
}
