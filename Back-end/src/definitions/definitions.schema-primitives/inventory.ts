import { Type } from '@sinclair/typebox';

export const InventorySchema = Type.Object({
    id: Type.String(),
    gameId: Type.String(),
    mineralName: Type.String(),
    quantity: Type.Integer()
});