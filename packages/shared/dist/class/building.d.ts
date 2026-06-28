import { type IBuilding, type BuildingOptions } from '../types/definition.js';
export default class Edificio {
    type: BuildingOptions;
    quantity: number;
    cost: number;
    amountImprovement: number;
    maxLevel: number;
    capacity: number;
    level: number;
    id: string;
    constructor(values: IBuilding);
    limit(): number;
}
