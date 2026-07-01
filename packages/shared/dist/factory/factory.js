import { creatorId, generateId } from './generateId.js';
import { createProbabilities } from './mineral.js';
import { dictionaryMinerals } from './diccionaryId.js';
import MinerClass from '../class/miner.js';
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
const createTool = (type, { reference, id: paramId, availability, defaultP }) => {
    const level = 1;
    if (defaultP)
        availability = false;
    const id = creatorId('tool', type, { id: paramId });
    const values = {
        ...reference,
        availability,
        level,
        id
    };
    return new ToolClass(values);
};
const createMiners = (type, { name, tool: toolD, reference, toolPermise, id: paramId }) => {
    const toolCreate = createTool('pick', {
        availability: false,
        defaultP: true
    });
    let tool = toolCreate;
    if (toolD) {
        tool = toolD;
    }
    if (toolPermise) {
        tool = toolCreate;
    }
    const id = creatorId('miner', type, { id: paramId });
    const force = MinerClass.calculateForce(1, reference.maxLevel);
    const level = force;
    const probabilities = createMineralProbabilities(type, force);
    const values = {
        ...reference, name, tool
    };
    const minerData = {
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
