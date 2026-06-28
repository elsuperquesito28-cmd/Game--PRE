export declare const authBody: import("@sinclair/typebox").TObject<{
    userName: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
}>;
export declare const authResponse: {
    200: import("@sinclair/typebox").TObject<{
        accessToken: import("@sinclair/typebox").TString;
        refreshToken: import("@sinclair/typebox").TString;
    }>;
    401: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
    404: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
};
export declare const gameIdqueryString: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
}>;
export declare const MinerSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TString;
    name: import("@sinclair/typebox").TString;
    force: import("@sinclair/typebox").TInteger;
    level: import("@sinclair/typebox").TInteger;
    maxLevel: import("@sinclair/typebox").TInteger;
    cost: import("@sinclair/typebox").TInteger;
    costImprovement: import("@sinclair/typebox").TInteger;
    tool: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TString;
        cost: import("@sinclair/typebox").TInteger;
        costImprovement: import("@sinclair/typebox").TInteger;
        level: import("@sinclair/typebox").TInteger;
        fortune: import("@sinclair/typebox").TInteger;
        efficiency: import("@sinclair/typebox").TInteger;
        maxLevel: import("@sinclair/typebox").TInteger;
        availability: import("@sinclair/typebox").TBoolean;
        value: import("@sinclair/typebox").TInteger;
        probability: import("@sinclair/typebox").TInteger;
    }>;
}>;
export declare const GetGameIdResponsePre: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    coins: import("@sinclair/typebox").TInteger;
    level: import("@sinclair/typebox").TInteger;
    levelNumber: import("@sinclair/typebox").TInteger;
    clickCoins: import("@sinclair/typebox").TInteger;
    limitMiners: import("@sinclair/typebox").TInteger;
    miners: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        type: import("@sinclair/typebox").TString;
        name: import("@sinclair/typebox").TString;
        force: import("@sinclair/typebox").TInteger;
        level: import("@sinclair/typebox").TInteger;
        maxLevel: import("@sinclair/typebox").TInteger;
        cost: import("@sinclair/typebox").TInteger;
        costImprovement: import("@sinclair/typebox").TInteger;
        tool: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TString;
            cost: import("@sinclair/typebox").TInteger;
            costImprovement: import("@sinclair/typebox").TInteger;
            level: import("@sinclair/typebox").TInteger;
            fortune: import("@sinclair/typebox").TInteger;
            efficiency: import("@sinclair/typebox").TInteger;
            maxLevel: import("@sinclair/typebox").TInteger;
            availability: import("@sinclair/typebox").TBoolean;
            value: import("@sinclair/typebox").TInteger;
            probability: import("@sinclair/typebox").TInteger;
        }>;
    }>>;
    inventory: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        gameId: import("@sinclair/typebox").TString;
        mineralName: import("@sinclair/typebox").TString;
        quantity: import("@sinclair/typebox").TInteger;
    }>>;
}>;
export declare const GetGameIdResponse: {
    200: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        coins: import("@sinclair/typebox").TInteger;
        level: import("@sinclair/typebox").TInteger;
        levelNumber: import("@sinclair/typebox").TInteger;
        clickCoins: import("@sinclair/typebox").TInteger;
        limitMiners: import("@sinclair/typebox").TInteger;
        miners: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            type: import("@sinclair/typebox").TString;
            name: import("@sinclair/typebox").TString;
            force: import("@sinclair/typebox").TInteger;
            level: import("@sinclair/typebox").TInteger;
            maxLevel: import("@sinclair/typebox").TInteger;
            cost: import("@sinclair/typebox").TInteger;
            costImprovement: import("@sinclair/typebox").TInteger;
            tool: import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TString;
                type: import("@sinclair/typebox").TString;
                cost: import("@sinclair/typebox").TInteger;
                costImprovement: import("@sinclair/typebox").TInteger;
                level: import("@sinclair/typebox").TInteger;
                fortune: import("@sinclair/typebox").TInteger;
                efficiency: import("@sinclair/typebox").TInteger;
                maxLevel: import("@sinclair/typebox").TInteger;
                availability: import("@sinclair/typebox").TBoolean;
                value: import("@sinclair/typebox").TInteger;
                probability: import("@sinclair/typebox").TInteger;
            }>;
        }>>;
        inventory: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TString;
            gameId: import("@sinclair/typebox").TString;
            mineralName: import("@sinclair/typebox").TString;
            quantity: import("@sinclair/typebox").TInteger;
        }>>;
    }>;
    404: import("@sinclair/typebox").TObject<{
        error: import("@sinclair/typebox").TString;
    }>;
};
//# sourceMappingURL=schemas.d.ts.map