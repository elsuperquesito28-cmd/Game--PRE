import { Type } from '@sinclair/typebox';

export const BuildingSchema = Type.Obect({
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
    500: Type.Obect({error: Type.String()})
};

export const BuildingParams = Type.Obect({
    id: Type.String()
});
