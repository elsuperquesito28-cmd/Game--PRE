export default {
    game: {
        coins: ['coins', ':coins'],
        level: ['level', ':level'],
        levelNumber: ['level_number', ':levelNumber'],
        clickCoins: ['click_coins', ':clickCoins'],
        limitMiners: ['limit_miners', ':limit']
    },
    users: {
        user: ['user', ':user'],
        password: ['password', ':password'],
        gameId: ['game_id', ':gameId']
    },
    miners: {
        gameId: ['game_id', ':gameId'],
        type: ['type', ':type'],
        force: ['force', ':force'],
        level: ['level', ':level'],
        maxLevel: ['max_level', ':maxLevel'],
        cost: ['cost', ':cost'],
        costImprovement: ['cost_improvement', ':costImprovement'],
        name: ['name', ':name']
    },
    tools: {
        minerId: ['miner_id', ':minerId'],
        gameId: ['game_id', ':gameId'],
        toolType: ['tool_type', ':type'],
        toolCost: ['tool_cost', ':cost'],
        toolCostImprovement: ['tool_cost_improvement', ':costImprovement'],
        toolLevel: ['tool_level', ':level'],
        fortuneLevel: ['fortune_level', ':fortune'],
        efficiencyLevel: ['efficiency_level', ':efficiency'],
        maxLevel: ['max_level', ':maxLevel'],
        availability: ['availability', ':availability']
    },
    inventory: {
        gameId: ['game_id', ':gameId'],
        mineralName: ['mineral_name', ':mineral'],
        quantity: ['quantity', ':quantity']
    },
    minersName: {
        type: ['type', ':type'],
        count: ['count', ':count'],
        gameId: ['game_id', ':gameId']
    },
    buildings: {
        gameId: ['game_id', ':gameId'],
        type: ['type', ':type'],
        quantity: ['quantity', ':quantity'],
        size: ['size', ':capacity'],
        cost: ['cost', ':cost'],
        quantityImprovement: ['quantity_improvement', ':amountImprovement'],
        level: ['level', ':level'],
        maxLevel: ['max_level', ':limit']
    },
    minersBase: {
        gameId: ['game_id', ':gameId'],
        type: ['type', ':type'],
        cost: ['cost', ':cost'],
        costImprovement: ['cost_improvement', ':costImprovement']
    },
    toolsBase: {
        gameId: ['game_id', ':gameId'],
        type: ['type', ':type'],
        cost: ['cost', ':cost'],
        costImprovement: ['cost_improvement', ':costImprovement']
    }
};
