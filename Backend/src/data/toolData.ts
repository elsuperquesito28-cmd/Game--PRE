export const dataTool = [
    {
        type: 'pick',
        efficiency: 1,
        fortune: 1,
        probability: 0,
        cost: 0,
        costImprovement: 50,
        value: 2,
        availability: false,
        maxLevel: 20
    },
    {
        type: 'drill',
        efficiency: 1,
        fortune: 1,
        probability: 0.02,
        cost: 250,
        costImprovement: 150,
        value: 50,
        availability: false,
        maxLevel: 25
    },
    {
        type: 'bigDrill',
        efficiency: 1,
        fortune: 1,
        probability: 0.05,
        cost: 600,
        costImprovement: 350,
        value: 200,
        availability: false,
        maxLevel: 30
    }
] as const;
