import { type MinersOption, type IMineralMiner, type ITool, type IMinerValues } from '../types/definition.js';
export default class Minero {
    #private;
    type: MinersOption;
    name: string;
    cost: number;
    id: string;
    constructor(values: IMinerValues);
    static calculateForce: (userLevel: number, maxLevel?: number) => number;
    produce: (bonus?: number) => IMineralMiner[];
    levelUp: () => void;
    get level(): number;
    get maxLevel(): 25 | 50 | 35;
    get force(): number;
    get costImprovement(): number;
    get capacity(): number;
    get tool(): ITool;
}
