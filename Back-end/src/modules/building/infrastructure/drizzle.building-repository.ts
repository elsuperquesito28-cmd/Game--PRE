import { type BuildingRepository } from '../domain/building.repository.js';
import { type IBuilding } from 'shared';

import { buildings } from '../../../database/schema.js';
import { type FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';

export class DrizzleBuildingRepository implements BuildingRepository {
    constructor(private db: FastifyInstance['db']) {}

    GetBuildignsByGameId = async (gameId: string): Promise<IBuilding[]| null> => {
        const building = await this.db
            .select({
                id: buildings.id,
                cost: buildings.cost,
                type: buildings.type,
                quantity: buildings.quantity,
                amountImprovement: buildings.quantityImprovement,
                level: buildings.level,
                maxLevel: buildings.maxLevel,
                capacity: buildings.size
            })
            .from(buildings)
            .where(eq(buildings.gameId, gameId));

        if (building) return building;

        return null;
    };
}
