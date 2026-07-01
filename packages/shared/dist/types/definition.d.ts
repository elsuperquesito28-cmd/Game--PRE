import { dataMiner } from '../base/base-miner-data.js';
import { toolData } from '../base/base-tool-data.js';
import { dataBuilding } from '../base/base-building-base.js';
import { dictionaryMinerals } from '../factory/diccionaryId.js';
export interface ParamsCreateMiner {
    name: string;
    tool?: ITool;
    reference: IMiner;
    toolPermise?: boolean;
    id?: string | undefined;
}
export interface ParamsCreateTool {
    availability: boolean;
    reference?: ITool;
    id?: string | undefined;
    defaultP?: boolean;
}
export type MineralsOptions = keyof typeof dictionaryMinerals;
export type MinersOption = (typeof dataMiner)[number]['type'];
export type ToolsOptions = (typeof toolData)[number]['type'];
export type BuildingOptions = (typeof dataBuilding)[number]['type'];
type minersValues = ParamsCreateMiner & {
    type: MinersOption;
};
type toolsValues = ParamsCreateTool & {
    type: ToolsOptions;
};
export type EntityValuesMap = {
    miner: minersValues;
    tool: toolsValues;
    building: {
        type: BuildingOptions;
    };
};
export type EntityOptions = keyof EntityValuesMap;
export type EntityFunctions = {
    [K in keyof EntityValuesMap]: (type: EntityValuesMap[K]) => any;
};
export type TypesEntity = MinersOption | ToolsOptions | BuildingOptions | 'game';
export interface ITool {
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
}
export interface IMiner {
    id: string;
    type: MinersOption;
    name: string;
    force: number;
    level: number;
    maxLevel: MinerMaxLevel;
    cost: number;
    costImprovement: number;
    tool: ITool;
}
export interface IBuilding {
    type: BuildingOptions;
    quantity: number;
    cost: number;
    amountImprovement: number;
    maxLevel: number;
    capacity: number;
    level: number;
    id: string;
}
export type EntityReturnMap = {
    miner: IMiner;
    tool: ITool;
    building: IBuilding;
};
export type MinerMaxLevel = (typeof dataMiner)[number]['maxLevel'];
export interface MinerBase {
    type: MinersOption;
    maxLevel: MinerMaxLevel;
    cost: number;
    costImprovement: number;
}
export interface ParamGenerateId {
    id: string | undefined;
}
export interface IMineralMiner {
    mineral: MineralsOptions;
    probability: number;
    rare: boolean;
}
export interface IMinerValues extends IMiner {
    capacity: number;
    probabilities: IMineralMiner[];
}
export type IDictionaryMineral = {
    [key in MineralsOptions]: {
        [K in MinersOption]: {
            denominator: number;
            numerator: number;
        };
    } & {
        rare: boolean;
    };
};
export {};
