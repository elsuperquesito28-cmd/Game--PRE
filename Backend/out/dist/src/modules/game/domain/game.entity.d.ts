import { type IMiner, type MineralsOptions } from 'shared';
export interface Inventory {
    mineralName: MineralsOptions;
    quantity: number;
    id: string;
    gameId: string;
}
export interface GameEntity {
    miners: IMiner[];
    inventory: Inventory[];
    coins: number;
    level: number;
    levelNumber: number;
    clickCoins: number;
    limitMiners: number;
    id: string;
}
//# sourceMappingURL=game.entity.d.ts.map