import {} from 'shared';
import {} from '../domain/game.entity.js';
import {} from '../../../database/db.js';
export const mapping = (gameFind) => {
    return {
        id: gameFind.id,
        coins: gameFind.coins,
        level: gameFind.level,
        levelNumber: gameFind.levelNumber,
        clickCoins: gameFind.clickCoins,
        limitMiners: gameFind.limitMiners,
        inventory: gameFind.inventory.map(inv => ({
            mineralName: inv.mineralName,
            quantity: inv.quantity,
            id: inv.id,
        })),
        miners: gameFind.miners.map(m => ({
            id: m.id,
            type: m.type,
            name: m.name,
            force: m.force,
            level: m.level,
            maxLevel: m.maxLevel,
            cost: m.cost,
            costImprovement: m.costImprovement,
            tool: m.tools
                ? {
                    id: String(m.tools.id),
                    type: m.tools.toolType,
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
                    type: 'default',
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
//# sourceMappingURL=mapping.js.map