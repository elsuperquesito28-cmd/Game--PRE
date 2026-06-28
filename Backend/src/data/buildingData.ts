export const buildingData = [
    {
        type: 'little',
        quantity: 1,
        cost: 1000,
        costImprovement: 1,
        maxLevel: 20,
        capacity: 10,
        level: 1
    },
    {
        type: 'middle',
        quantity: 0,
        cost: 10000,
        costImprovement: 1,
        maxLevel: 25,
        capacity: 50,
        level: 1
    },
    {
        type: 'big',
        quantity: 0,
        cost: 100000,
        costImprovement: 1,
        maxLevel: 30,
        capacity: 100,
        level: 1
    }
] as const;
