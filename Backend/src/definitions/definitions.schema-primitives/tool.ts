import { Type } from '@sinclair/typebox';

export const ToolSchema = Type.Object({
        id: Type.String(),
        type: Type.String(),
        cost: Type.Integer(),
        costImprovement: Type.Integer(),
        level: Type.Integer(),
        fortune: Type.Integer(),
        efficiency: Type.Integer(),
        maxLevel: Type.Integer(),
        availability: Type.Boolean(),
        value: Type.Integer(),
        probability: Type.Integer()
    })