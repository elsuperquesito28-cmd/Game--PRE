export const dictionaryTypes = {
    miner: 'M',
    tool: 'T',
    building: 'B',
    game: 'GAME'
};
export const dictionaryMinerals = {
    coal: {
        beginner: { numerator: 7, denominator: 10 }, // 70%
        medium: { numerator: 1, denominator: 4 }, // 25%
        expert: { numerator: 1, denominator: 7 }, // ~14.28%
        rare: false
    },
    copper: {
        beginner: { numerator: 4, denominator: 10 }, // 40%
        medium: { numerator: 3, denominator: 15 }, // 20%
        expert: { numerator: 1, denominator: 8 }, // 12.5%
        rare: false
    },
    iron: {
        beginner: { numerator: 1, denominator: 5 }, // 20%
        medium: { numerator: 1, denominator: 4 }, // 25%
        expert: { numerator: 1, denominator: 3 }, // ~33.33%
        rare: false
    },
    gold: {
        beginner: { numerator: 1, denominator: 100 }, // 1%
        medium: { numerator: 2, denominator: 7 }, // ~28.57%
        expert: { numerator: 4, denominator: 8 }, // 50%
        rare: true
    },
    diamond: {
        beginner: { numerator: 1, denominator: 200 }, // 0.5%
        medium: { numerator: 1, denominator: 150 }, // ~0.67%
        expert: { numerator: 50, denominator: 256 }, // ~19.53%
        rare: true
    },
    ruby: {
        beginner: { numerator: 1, denominator: 900 }, // ~0.11%
        medium: { numerator: 1, denominator: 850 }, // ~0.12%
        expert: { numerator: 1, denominator: 600 }, // ~0.16%
        rare: true
    },
    terracotta: {
        beginner: { numerator: 1, denominator: 400 }, // 0.25%
        medium: { numerator: 1, denominator: 300 }, // ~0.33%
        expert: { numerator: 1, denominator: 100 }, // 1%
        rare: true
    }
};
