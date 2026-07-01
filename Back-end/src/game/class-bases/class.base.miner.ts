import { type MinersOption, type MinerMaxLevel } from 'shared';

export class MinerBase {
    type: MinersOption;
    maxLevel: MinerMaxLevel;
    cost: number;
    costImprovement: number;
    id: string;
    constructor(id:string,type: MinersOption, cost: number, costIm: number, max: MinerMaxLevel) {
        this.type = type;
        this.cost = cost;
        this.costImprovement = costIm;
        this.maxLevel = max;
        this.id=id
    }
}
