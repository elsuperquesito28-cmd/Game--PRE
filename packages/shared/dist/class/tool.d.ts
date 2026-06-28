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
    constructor(values: ITool);
}
