import { creatorId, generateId } from './generateId.js';
import { createProbabilities } from './mineral.js';
import { dictionaryMinerals } from './diccionaryId.js';
import MinerClass from '../class/miner.js';
import { dataMiner } from '../base/base-miner-data.js';
import { toolData } from '../base/base-tool-data.js';
import ToolClass from '../class/tool.js';
import { dataBuilding } from '../base/base-building-base.js';
import BuildingClass from '../class/building.js';
import MineralClass from '../class/class-mineralProbabity.js';
const createMineralProbabilities = (type, force) => {
    let mineralList = [];
    for (const key in dictionaryMinerals) {
        const mineral = key;
        const d = dictionaryMinerals[mineral][type];
        const probability = d.numerator / d.denominator;
        const newMineral = new MineralClass(mineral, probability, dictionaryMinerals[mineral]['rare']);
        mineralList.push(newMineral);
    }
    mineralList = createProbabilities(force, mineralList, type);
    return mineralList;
};
const createTool = (type, values) => {
    const toolBase = toolData.find(n => n.type === type);
    if (!toolBase)
        throw new Error('This type of tool not exists');
    const level = 1;
    const paramId = values.id;
    const id = creatorId('tool', type, { id: paramId });
    const dataTool = { ...toolBase, ...values, id, level };
    return new ToolClass(dataTool);
};
const createMiners = (type, values) => {
    let minerBase = dataMiner.find(n => n.type === type);
    if (!minerBase)
        throw new Error('this miner not exists');
    if (values.reference)
        minerBase = values.reference;
    const toolCreate = createTool('pick', {
        availability: false
    });
    let tool = toolCreate;
    if (values.tool) {
        tool = values.tool;
    }
    if (values.toolPermise) {
        tool = toolCreate;
    }
    const paramId = values.id;
    const id = creatorId('miner', type, { id: paramId });
    const force = MinerClass.calculateForce(1, minerBase.maxLevel);
    const level = force;
    const probabilities = createMineralProbabilities(type, force);
    const minerData = {
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
const createBuilding = (type) => {
    const buildingBase = dataBuilding.find(n => n.type === type);
    if (!buildingBase)
        throw new Error('This type of building not exists');
    const id = generateId('building', type);
    return new BuildingClass({ ...buildingBase, id });
};
const handlers = {
    miner: values => createMiners(values.type, values),
    tool: values => createTool(values.type, values),
    building: type => createBuilding(type.type)
};
export const createEntity = (entityType, values) => {
    return handlers[entityType](values);
};
