import { dataTool } from '../../data/toolData';
import { dataMiner } from '../../data/minerData';
import { buildingData } from '../../data/buildingData';
import { mineralData } from '../../data/mineralData';

export interface Base {
    coins: number;
    level: number;
    upgradeNumber: number;
    upgradeLevel: () => void;
}

export interface mixinTool extends Base {
    tool: Record<toolOption, Map<number, ITool>>;
    toolBase: ITool[];
    buyTool: (type: toolOption, id: number) => void;
    upgradeTool: (id: number) => void;
}

export interface mixinBuilding extends mixinTool {
    building: Record<buildingOption, IBuilding>;
    buyBuilding: (type: buildingOption) => void;
    uogradeBuilding: (id: number) => void;
    limit: () => number;
}

export interface mixinMiner extends mixinBuilding {
    miner: Record<minerOption, Map<number, IMiner>>;
    minerBase: IMiner[];
    buyMiner: (type: minerOption, id: Record<'tool' | 'miner', number>) => void;
    upgrdeMiner: (id: number, type: minerOption) => void;
}

export interface ITool {
    type: string;
    cost: number;
    costImprovement: number;
    availability: boolean;
    value: number;
    efficiency: number;
    fortune: number;
    maxLevel: number;
    probability: number;
    id: number;
    level: number;
}

export interface IMiner {
    type: string;
    name: string;
    maxLevel: number;
    id: number;
    force: number;
    costImprovement: number;
    cost: number;
    level: number;
    tool: ITool;
}

export interface IBuilding {
    type: string;
    level: number;
    quantity: number;
    cost: number;
    costImprovement: number;
    maxLevel: number;
    capacity: number;
    id: number;

    limit: () => number;
}

type minerals = (typeof mineralData)[number]['name'];

export interface IMineral {
    name: minerals;
    price: number;
    probability: number;
}

export interface configTool {
    availability: boolean;
    reference: BaseTool;
    id?: string;
}

export type toolOption = (typeof dataTool)[number]['type'];

export type buildingOption = (typeof buildingData)[number]['type'];

export type minerOption = (typeof dataMiner)[number]['type'];

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface BaseMiner {
    type: minerOption;
    cost: number;
    costImprovement: number;
    id: string;
}

export interface BaseTool {
    type: toolOption;
    cost: number;
    costImprovement: number;
    id: string;
    value: number;
}

export interface ReturnMiner {
    miner: Record<minerOption, Map<number, IMiner>>;
    base: BaseMiner[];
    name: Record<minerOption, number>;
}

export interface ReturnTool {
    tool: Record<toolOption, Map<number, ITool>>;
    base: BaseTool[];
}

export interface configMiner {
    name: string;
    levelGame: number;
    reference: BaseMiner;
    id: Record<'miner' | 'tool', number>;
}
