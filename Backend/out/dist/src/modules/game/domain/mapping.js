import {} from 'shared';
import {} from '../../../database/db.js'; // Asegúrate de importar tu instancia de base de datos 'db' para extraer el tipo
// 2. Aplicamos el tipo al parámetro y removemos los tipados manuales viejos
export const mapping = (gameFind) => {
    return {
        coins: gameFind.coins,
        level: gameFind.level,
        levelNumber: gameFind.levelNumber,
        clickCoins: gameFind.clickCoins,
        limitMiners: gameFind.limitMiners,
        inventory: gameFind.inventory.map(inv => ({
            mineralName: inv.mineralName,
            quantity: inv.quantity
        })),
        // Eliminamos el '(m: IMiner)' porque TypeScript ahora sabe EXACTAMENTE qué es 'm' gracias a Drizzle
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
                    // Valores por defecto si m.tools no existe
                    id: ' t',
                    type: 'default', // Cambia 'default' por un valor válido de tu enum
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