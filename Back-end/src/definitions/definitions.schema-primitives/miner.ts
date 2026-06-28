import { Type } from '@sinclair/typebox';
import {ToolSchema} from './tool.js'

export const MinerSchema = Type.Object({
    id: Type.String(),
    type: Type.String(),
    name: Type.String(),
    force: Type.Integer(),
    level: Type.Integer(),
    maxLevel: Type.Integer(),
    cost: Type.Integer(),
    costImprovement: Type.Integer(),
    tool: ToolSchema
});
