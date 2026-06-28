import {
    type ToolsOptions,
    type MineralsOptions,
    type MinersOption,
    type MinerMaxLevel
} from 'shared';
import { type Inventory } from '../domain/game.entity.js';
import { type db } from '../../../database/db.js';

type GetGameQueryResult = ReturnType<
    typeof db.query.game.findFirst<{
        with: {
            inventory: true;
            miners: {
                with: {
                    tools: true;
                };
            };
        };
    }>
>;

export type DrizzleGameResult = NonNullable<Awaited<GetGameQueryResult>>;

export const mapping = (gameFind: DrizzleGameResult) => {
    return {
        id: gameFind.id,
        coins: gameFind.coins,
        level: gameFind.level,
        levelNumber: gameFind.levelNumber,
        clickCoins: gameFind.clickCoins,
        limitMiners: gameFind.limitMiners,
        inventory: gameFind.inventory.map(inv => ({
            mineralName: inv.mineralName as MineralsOptions,
            quantity: inv.quantity,
            id: inv.id,
            
        })) as Inventory[],

        miners: gameFind.miners.map(m => ({
            id: m.id,
            type: m.type as MinersOption,
            name: m.name,
            force: m.force,
            level: m.level,
            maxLevel: m.maxLevel as MinerMaxLevel,
            cost: m.cost,
            costImprovement: m.costImprovement,
            tool: m.tools
                ? {
                      id: String(m.tools.id),
                      type: m.tools.toolType as ToolsOptions,
                      cost: m.tools.toolCost,
                      costImprovement: m.tools.toolCostImprovement,
                      level: m.tools.toolLevel,
                      fortune: m.tools.fortuneLevel,
                      efficiency: m.tools.efficiencyLevel,
                      maxLevel: m.tools.maxLevel,
                      availability: m.tools.availability === 1,
                      value: m.tools.value,
                      probability: 0
                  }
                : {
                      id: ' t',
                      type: 'default' as ToolsOptions,
                      cost: 0,
                      costImprovement: 0,
                      level: 1,
                      fortune: 0,
                      efficiency: 0,
                      maxLevel: 1,
                      availability: false,
                      value: 0,
                      probability: 0
                  }
        }))
    };
};

export type GameEntity = ReturnType<typeof mapping>;
