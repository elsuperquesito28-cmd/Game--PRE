import {
    type MinersOption,
    type MinerMaxLevel,
    type IMineralMiner,
    type ITool,
    type IMinerValues
} from '../types/definition.js';

import { indexOfMax } from '../factory/generateId.js';
import { createProbabilities } from '../factory/mineral.js';

export default class Minero {
    type: MinersOption;
    name: string;
    #maxLevel: MinerMaxLevel;
    #level: number;
    cost: number;
    #costImprovement: number;
    #tool: ITool;
    #force: number;
    id: string;
    #probabilities: IMineralMiner[];
    #capacity: number;

    constructor(values: IMinerValues) {
        const {
            type,
            name,
            maxLevel,
            level,
            cost,
            costImprovement,
            tool,
            force,
            id,
            probabilities,
            capacity
        } = values;
        this.type = type;
        this.name = name;
        this.#maxLevel = maxLevel;
        this.#level = level;
        this.cost = cost;
        this.#costImprovement = costImprovement;
        this.#tool = tool;
        this.#force = force;
        this.id = id;
        this.#probabilities = probabilities;
        this.#capacity = capacity;
    }

    static calculateForce = (userLevel: number, maxLevel = 25): number => {
        const probabilities = Array.from({ length: maxLevel }, (_, i) => {
            i += 1;
            const valueAbs = Math.abs(i - userLevel);

            const probability = Math.pow(0.5, valueAbs);

            return { level: i, probability };
        });

        const total = probabilities.reduce((acum, e) => acum + e.probability, 0);

        const probabilitiesReorganized = probabilities.map(n => {
            const probability = n.probability / total;
            return { level: n.level, probability };
        });

        const randomNumber = Math.random();

        let numberProbability = 0;

        const levelFind = probabilitiesReorganized.find(n => {
            numberProbability += n.probability;

            return numberProbability >= randomNumber;
        });

        if (levelFind) return levelFind!.level;

        return 1;
    };

    produce = (bonus = 1): IMineralMiner[] => {
        const total: number = this.#probabilities.reduce((acum, e) => acum + e.probability, 0);

        const mineralsFind: IMineralMiner[] = [];

        const numberRepeat: number = (this.#force + this.tool.efficiency) * bonus;

        for (let i: number = 0; i < numberRepeat; i++) {
            let numberProvability: number = 0;

            const randomNumber: number = Math.random() * total;

            const mineralFind = this.#probabilities.find(n => {
                numberProvability += n.probability;

                return numberProvability >= randomNumber;
            });

            if (mineralFind) mineralsFind.push(mineralFind);
        }

        const lengthMineralsFind: number = mineralsFind.length;

        if (lengthMineralsFind <= this.#capacity) return mineralsFind;

        const shortenedMineralList: IMineralMiner[] = [];

        for (let i: number = 0; i < this.#capacity; i++) {
            const index = indexOfMax(mineralsFind);

            if (mineralsFind[index]) {
                shortenedMineralList.push(mineralsFind[index]);

                mineralsFind.splice(index, 1);
            }
        }

        return shortenedMineralList;
    };

    #levelUpBasis = () => {
        const isLevelMax: boolean = this.#maxLevel <= this.#level;
        if (isLevelMax) throw new Error('This miener has levelMax');
        this.#level += 1;
        this.#force += 1;

        const capacityLevel: number = Math.min(Math.floor(this.#force / 4) * 4, this.#maxLevel * 4);

        this.#capacity = capacityLevel;

        this.#costImprovement = Math.floor(this.#costImprovement * 1.35);
    };

    levelUp = (): void => {
        this.#levelUpBasis();

        this.#probabilities = createProbabilities(this.#force, this.#probabilities, this.type);
    };

    get level() {
        return this.#level;
    }

    get maxLevel() {
        return this.#maxLevel;
    }

    get force() {
        return this.#force;
    }

    get costImprovement() {
        return this.#costImprovement;
    }

    get capacity() {
        return this.#capacity;
    }

    get tool() {
        return this.#tool;
    }
}
