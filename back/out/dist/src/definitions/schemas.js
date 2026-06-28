import { Type } from '@sinclair/typebox';
export const authBody = Type.Object({
    userName: Type.String(),
    password: Type.String()
});
export const authResponse = {
    200: Type.Object({
        accessToken: Type.String(),
        refreshToken: Type.String()
    }),
    401: Type.Object({
        error: Type.String()
    }),
    404: Type.Object({
        error: Type.String()
    })
};
export const gameIdqueryString = Type.Object({
    id: Type.String()
});
export const MinerSchema = Type.Object({
    id: Type.String(),
    type: Type.String(),
    name: Type.String(),
    force: Type.Integer(),
    level: Type.Integer(),
    maxLevel: Type.Integer(),
    cost: Type.Integer(),
    costImprovement: Type.Integer(),
    tool: Type.Object({
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
});
const InventorySchema = Type.Object({
    id: Type.String(),
    gameId: Type.String(),
    mineralName: Type.String(),
    quantity: Type.Integer()
});
export const GetGameIdResponsePre = Type.Object({
    id: Type.String(),
    coins: Type.Integer(),
    level: Type.Integer(),
    levelNumber: Type.Integer(),
    clickCoins: Type.Integer(),
    limitMiners: Type.Integer(),
    miners: Type.Array(MinerSchema),
    inventory: Type.Array(InventorySchema)
});
export const GetGameIdResponse = {
    200: GetGameIdResponsePre,
    404: Type.Object({
        error: Type.String()
    })
};
//# sourceMappingURL=schemas.js.map