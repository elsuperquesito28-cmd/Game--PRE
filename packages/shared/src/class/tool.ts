import { type ToolsOptions, type ITool } from '../types/definition.js';

export default class Herramienta {
    type: ToolsOptions;
    cost: number;
    costImprovement: number;
    value: number;
    efficiency: number;
    fortune: number;
    maxLevel: number;
    level: number;
    id: string;
    probability: number;
    availability: boolean;
    constructor(values: ITool) {
        const {
            type,
            cost,
            costImprovement,
            value,
            efficiency,
            fortune,
            maxLevel,
            level,
            id,
            probability,
            availability
        } = values;
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
