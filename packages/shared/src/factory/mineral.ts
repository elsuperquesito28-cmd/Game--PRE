import {
    type IMineralMiner,
    type IDictionaryMineral,
    type MineralsOptions,
    type MinersOption
} from '../types/definition.js';
import { dictionaryMinerals } from './diccionaryId.js';
import MineralClass from '../class/class-mineralProbabity.js';

export const createProbabilities = (
    force: number,
    mineralList: IMineralMiner[],
    type: MinersOption
): IMineralMiner[] => {
    const dictionary: IDictionaryMineral = dictionaryMinerals;

    const keys = Object.keys(dictionary) as MineralsOptions[];

    const minerals = keys.reduce(
        (acc, mineral) => {
            acc[mineral] = dictionary[mineral][type];
            return acc;
        },
        {} as Record<MineralsOptions, { denominator: number; numerator: number }>
    );

    const mineralListUppgrade: IMineralMiner[] = [];

    const sqrForce = Math.sqrt(force);

    mineralList.forEach(n => {
        const rare = n.rare;

        if (rare) {
            const denominator = minerals[n.mineral].denominator / sqrForce;
            const probabilities: number = minerals[n.mineral].numerator / denominator;

            const mineralAdd = new MineralClass(n.mineral, probabilities, n.rare);

            mineralListUppgrade.push(mineralAdd);
        } else {
            const denominator = minerals[n.mineral].denominator * sqrForce;

            const probabilities: number = minerals[n.mineral].numerator / denominator;

            const mineralAdd = new MineralClass(n.mineral, probabilities, n.rare);

            mineralListUppgrade.push(mineralAdd);
        }
    });

    return mineralListUppgrade;
};
