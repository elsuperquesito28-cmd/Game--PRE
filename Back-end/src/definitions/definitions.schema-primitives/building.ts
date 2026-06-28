import { Type } from '@sinclair/typebox';

export const BuildingSchema = Type.Object({
    id: Type.String(),
    cost: Type.Integer(),
    amountImprovement: Type.Integer(),
    maxLevel: Type.Integer(),
    level: Type.Integer(),
    capacity: Type.Integer()
});

export const BuildingArray = Type.Array(BuildingSchema);

export const BuildingResponse = {
    200: BuildingArray,
    404: Type.Object({ error: Type.String() }),
    500: Type.Object({ error: Type.String() })
};

export const BuildingParams = Type.Object({
    id: Type.String()
});
