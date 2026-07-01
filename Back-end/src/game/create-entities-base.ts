import {
    type MinersOption,
    type ToolsOptions,
    type BuildingOptions,
    dataMiner,
    toolData,
    dataBuilding,
    type IMiner,
    type ITool,
    type IBuilding,
    generateId,
    creatorId
} from 'shared';
import { MinerBase } from './class-bases/class.base.miner.js';
import { ToolBase } from './class-bases/class.tool-base.js';
import BuildingClass from './class-bases/building.js';

type MinersMap = Record<MinersOption, Map<number, IMiner>>;
type ToolMap = Record<ToolsOptions, Map<number, ITool>>;

type EntityOptions = 'miner' | 'tool';

type EntityReturn = {
    miner: [MinerBase[], MinersMap];
    tool: [ToolBase[], ToolMap];
};

const createMinerBase = (type: MinersOption): MinerBase => {
    const minerBase = dataMiner.find(n => n.type === type);

    if (!minerBase) throw new Error('This type of miner not exists');

    const { cost, maxLevel, costImprovement } = minerBase;

    const id = creatorId('miner', type, { id: undefined, base: true });

    return new MinerBase(id, type, cost, costImprovement, maxLevel);
};

const createToolBase = (type: ToolsOptions): ToolBase => {
    const toolbase = toolData.find(n => n.type);

    if (!toolbase) throw new Error('This type of tool not exists');

    const { cost, maxLevel, costImprovement: cI } = toolbase;

    const id = creatorId('tool', type, { id: undefined, base: true });

    return new ToolBase(type, cost, cI, maxLevel);
};

const createBuilding = (type: BuildingOptions): IBuilding => {
    const buildingBase = dataBuilding.find(n => n.type === type);

    if (!buildingBase) throw new Error('This type of building not exists');

    const id: string = generateId('building', type);

    return new BuildingClass({ ...buildingBase, id });
};

const dictionary = {
    miner: {
        entity: {} as MinersMap,
        base: [] as MinerBase[],
        valuesDefault: dataMiner,
        creator: createMinerBase
    },
    tool: {
        entity: {} as ToolMap,
        base: [] as ToolBase[],
        valuesDefault: toolData,
        creator: createToolBase
    }
};

export const createBaseEntity = <T extends EntityOptions>(type: T): EntityReturn[T] => {
    const entitySelect = dictionary[type];

    const entity = entitySelect.entity;
    const entityBase = entitySelect.base;

    entitySelect.valuesDefault.forEach(n => {
        entity[n.type] = new Map();

        const minerCreate = entitySelect.creator(n.type);

        entityBase.push(minerCreate);
    });

    return [entityBase, entity] as EntityReturn[T];
};
