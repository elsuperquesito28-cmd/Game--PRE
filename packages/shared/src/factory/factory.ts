import { creatorId, generateId } from './generateId.js';
import { createProbabilities } from './mineral.js';
import { dictionaryMinerals } from './diccionaryId.js';

import {
    type MinersOption,
    type ToolsOptions,
    type BuildingOptions,
    type EntityOptions,
    type EntityValuesMap,
    type EntityFunctions,
    type ITool,
    type IMiner,
    type IBuilding,
    type EntityReturnMap,
    type MinerBase,
    type ParamsCreateTool,
    type ParamsCreateMiner,
    type IMinerValues,
    type IMineralMiner,
    type MineralsOptions
} from '../types/definition.js';

import MinerClass from '../class/miner.js';
import { dataMiner } from '../base/base-miner-data.js';

import { toolData } from '../base/base-tool-data.js';
import ToolClass from '../class/tool.js';

import { dataBuilding } from '../base/base-building-base.js';
import BuildingClass from '../class/building.js';

import MineralClass from '../class/class-mineralProbabity.js';

const createMineralProbabilities = (type: MinersOption, force: number): IMineralMiner[] => {
    let mineralList: IMineralMiner[] = [];

    for (const key in dictionaryMinerals) {
        const mineral = key as MineralsOptions;

        const d = dictionaryMinerals[mineral][type];

        const probability = d.numerator / d.denominator;

        const newMineral = new MineralClass(
            mineral,
            probability,
            dictionaryMinerals[mineral]['rare']
        );

        mineralList.push(newMineral);
    }

    mineralList = createProbabilities(force, mineralList, type);

    return mineralList;
};

const createTool = (
    type: ToolsOptions,
    { reference, id: paramId, availability }: ParamsCreateTool
): ITool => {
    const level: number = 1;

    const id: string = creatorId('tool', type, { id: paramId });

    if (!reference) return ToolClass.createInstance(type, { availability });

    const values = {
        ...reference,
        availability,
        level,
        id
    };

    return new ToolClass(values);
};

const createMiners = (
    type: MinersOption,
    { name, tool: toolD, reference, toolPermise, id: paramId }: ParamsCreateMiner
): IMiner => {
    let tool: ITool;

    if (toolD) {
        tool = toolD;
    }

    if (toolPermise) {
        tool = ToolClass.createInstance('pick', )
    }

    const id: string = creatorId('miner', type, { id: paramId });

    const force: number = MinerClass.calculateForce(1, reference.maxLevel);

    const level: number = force;

    const probabilities = createMineralProbabilities(type, force);

    const values = {
        ...reference,
        name,
        tool
    };

    const minerData: IMinerValues = {
        ...values,
        tool,
        id,
        level,
        force,
        capacity: 4,
        probabilities
    };

    return new MinerClass(minerData);
};

const createBuilding = (type: BuildingOptions) => {
    throw new Error('This function arent availability')
};

const handlers: EntityFunctions = {
    miner: values => createMiners(values.type, values),
    tool: values => createTool(values.type, values),
    building: type => createBuilding(type.type)
};

export const createEntity = <T extends EntityOptions>(
    entityType: T,
    values: EntityValuesMap[T]
): EntityReturnMap[T] => {
    return handlers[entityType](values);
};
