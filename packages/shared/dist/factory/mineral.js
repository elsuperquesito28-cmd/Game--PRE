import { dictionaryMinerals } from './diccionaryId.js';
import MineralClass from '../class/class-mineralProbabity.js';
export const createProbabilities = (force, mineralList, type) => {
    const dictionary = dictionaryMinerals;
    const keys = Object.keys(dictionary);
    const minerals = keys.reduce((acc, mineral) => {
        acc[mineral] = dictionary[mineral][type];
        return acc;
    }, {});
    const mineralListUppgrade = [];
    const sqrForce = Math.sqrt(force);
    mineralList.forEach(n => {
        const rare = n.rare;
        if (rare) {
            const denominator = minerals[n.mineral].denominator / sqrForce;
            const probabilities = minerals[n.mineral].numerator / denominator;
            const mineralAdd = new MineralClass(n.mineral, probabilities, n.rare);
            mineralListUppgrade.push(mineralAdd);
        }
        else {
            const denominator = minerals[n.mineral].denominator * sqrForce;
            const probabilities = minerals[n.mineral].numerator / denominator;
            const mineralAdd = new MineralClass(n.mineral, probabilities, n.rare);
            mineralListUppgrade.push(mineralAdd);
        }
    });
    return mineralListUppgrade;
};
