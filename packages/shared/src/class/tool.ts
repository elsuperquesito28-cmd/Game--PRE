import { type ToolsOptions, type ITool } from '../types/definition.js';
import { toolData } from '../base/base-tool-data.js';
import { creatorId } from '../factory/generateId.js';

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

    static createInstance = (type: ToolsOptions, overrides: Partial<ITool>) => {
        const base = toolData.find(n => n.type === type);

        if (!base) throw new Error('This type of tool not exists');

        return new Herramienta({
            ...base,
            id: creatorId('tool', type, { id: undefined }),
            availability: false,
            level: 1,
            ...overrides
        });
    };
}
