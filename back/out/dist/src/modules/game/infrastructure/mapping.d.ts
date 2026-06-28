import { type ToolsOptions, type MinersOption, type MinerMaxLevel } from 'shared';
import { type Inventory } from '../domain/game.entity.js';
import { type db } from '../../../database/db.js';
type GetGameQueryResult = ReturnType<typeof db.query.game.findFirst<{
    with: {
        inventory: true;
        miners: {
            with: {
                tools: true;
            };
        };
    };
}>>;
export type DrizzleGameResult = NonNullable<Awaited<GetGameQueryResult>>;
export declare const mapping: (gameFind: DrizzleGameResult) => {
    id: string;
    coins: number;
    level: number;
    levelNumber: number;
    clickCoins: number;
    limitMiners: number;
    inventory: Inventory[];
    miners: {
        id: string;
        type: MinersOption;
        name: string;
        force: number;
        level: number;
        maxLevel: MinerMaxLevel;
        cost: number;
        costImprovement: number;
        tool: {
            id: string;
            type: ToolsOptions;
            cost: number;
            costImprovement: number;
            level: number;
            fortune: number;
            efficiency: number;
            maxLevel: number;
            availability: boolean;
            value: number;
            probability: number;
        };
    }[];
};
export type GameEntity = ReturnType<typeof mapping>;
export {};
//# sourceMappingURL=mapping.d.ts.map