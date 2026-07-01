import { type ToolsOptions } from 'shared';

export class ToolBase {
  id:string
    type: ToolsOptions;
    maxLevel: number;
    cost: number;
    costImprovement: number;
    constructor(id:string, type: ToolsOptions, cost: number, costIm: number, max: number) {
        this.type = type;
        this.cost = cost;
        this.costImprovement = costIm;
        this.maxLevel = max;
        this.id=id
    }
}
