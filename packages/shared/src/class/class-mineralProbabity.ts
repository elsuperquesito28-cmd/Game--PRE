import { type MineralsOptions } from '../types/definition.js';

export default class Mineral {
    mineral: MineralsOptions;
    probability: number;
    rare: boolean;

    constructor(name: MineralsOptions, probabitity: number, rare: boolean) {
        this.mineral = name;
        this.probability = probabitity;
        this.rare = rare;
    }
}
