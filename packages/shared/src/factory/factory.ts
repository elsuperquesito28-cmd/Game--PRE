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

const createTool = (type: ToolsOptions, values: ParamsCreateTool): ITool => {
    const toolBase = toolData.find(n => n.type === type);

    if (!toolBase) throw new Error('This type of tool not exists');

    const level: number = 1;

    const paramId = values.id;

    const id: string = creatorId('tool', type, { id: paramId });

    const dataTool: ITool = { ...toolBase, ...values, id, level };

    return new ToolClass(dataTool);
};

const createMiners = (type: MinersOption, values: ParamsCreateMiner): IMiner => {
    let minerBase: MinerBase | undefined = dataMiner.find(n => n.type === type);

    if (!minerBase) throw new Error('this miner not exists');

    if (values.reference) minerBase = values.reference;

    const toolCreate = createTool('pick', {
        availability: false
    });
    let tool: ITool = toolCreate;

    if (values.tool) {
        tool = values.tool;
    }

    if (values.toolPermise) {
        tool = toolCreate;
    }

    const paramId = values.id;

    const id: string = creatorId('miner', type, { id: paramId });

    const force: number = MinerClass.calculateForce(1, minerBase.maxLevel);

    const level: number = force;

    const probabilities = createMineralProbabilities(type, force);

    const minerData: IMinerValues = {
        ...minerBase,
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

const createBuilding = (type: BuildingOptions): IBuilding => {
    const buildingBase = dataBuilding.find(n => n.type === type);

    if (!buildingBase) throw new Error('This type of building not exists');

    const id: string = generateId('building', type);

    return new BuildingClass({ ...buildingBase, id });
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
