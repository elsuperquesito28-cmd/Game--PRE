import Miner from '../class/miner';
import Tool from '../class/tool';
import Building from '../class/building';

import { verify } from './verify';

import {
    toolOption,
    buildingOption,
    minerOption,
    ITool,
    IMiner,
    IBuilding,
    IMineral,
    configTool,
    configMiner,
    BaseMiner,
    BaseTool
} from '../../type/logic/interface';

let minerId: string = 'FRONT_M';
let toolId: string = 'FRONT_T';
let mineralId: string = 'FRONT_Min';

const generarId = (value): string => {
    const { categoria, type, prefix } = value;
    const random = Math.random().toString(36).slice(2, 12);
    return `${categoria}_${type}_${random}`;
};

/**
 * Crea una herramienta
 * @param type - tipo de herramienta a crear
 * @param config.availability - decide si la herramienta está disponible o no
 * @param config.reference - herramienta que usará como referencia base
 * @param config.id - id del servidor, si es undefined usa el default temporal
 * @returns ITool con todos los datos de la herramienta creada
 */
export const createTool = (type: toolOption, config: configTool): ITool => {
    const { availability, reference } = config;
    let { id } = config;
    verify({ availability, reference });

    const tool = reference;

    id = id ? id : minerId;

    const idGenerate = generarId({
        categoria: id,
        tipo: type
    });

    const values: ITool = {
        type,
        cost: tool.cost,
        costImprovement: tool.costImprovement,
        availability,
        value: tool.value,
        efficiency: 1,
        fortune: 1,
        maxLevel: tool.maxLevel,
        level: 1,
        probability: tool.probability,
        id: idGenerate
    };

    const newTool: ITool = new Tool(values);

    return newTool;
};

/**
 * Crea un minero
 * @param type - tipo de minero a crear
 * @param config.name - nombre del minero
 * @param config.levelGame - nivel del jugador, usado para calcular la fuerza
 * @param config.reference - si se provee, reemplaza los datos base del tipo
 * @param config.id - id del servidor, si es undefined usa el default temporal
 * @returns IMiner con todos los datos del minero creado
 * @throws Error si el tipo no existe
 * @throws Error si no se provee herramienta y toolPermise es false
 * @see Miner.calcularFuerza
 */
export const createMiners = (type: minerOption, config: configMiner) => {
    let { name, levelGame, reference, id } = config;

    const miner = reference;

    id.tool = id.tool > 0 ? id.tool : toolId;
    id.miner = id.miner > 0 ? id.miner : minerId;

    const tool = createTool('pick', { availability: false, id: id.tool });

    verify({ name, levelGame, tool });

    const maxLevel = miner.maxLevel;
    const force: number = Miner.calcularFuerza(levelGame, maxLevel);

    const value: IMiner = {
        type,
        name,
        tool,
        force,
        maxLevel,
        id: id.miner,
        costImprovement: miner.costImprovement,
        cost: miner.cost,
        level: 1
    };

    const newMiner: IMiner = new Miner(value);
    return { tool, miner: newMiner };
};
