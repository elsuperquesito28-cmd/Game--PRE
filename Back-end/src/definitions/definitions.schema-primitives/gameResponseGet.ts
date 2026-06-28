import { Type } from '@sinclair/typebox';
import { MinerSchema } from './miner.js';
import { InventorySchema } from './inventory.js';

export const GameSchema = Type.Object({
    id: Type.String(),
    coins: Type.Integer(),
    level: Type.Integer(),
    levelNumber: Type.Integer(),
    clickCoins: Type.Integer(),
    limitMiners: Type.Integer(),
    miners: Type.Array(MinerSchema),
    inventory: Type.Array(InventorySchema)
});

