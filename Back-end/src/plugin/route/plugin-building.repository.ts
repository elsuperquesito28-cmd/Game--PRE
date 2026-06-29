import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

import { DrizzleBuildingRepository } from '../../modules/building/infrastructure/drizzle.building-repository.js';
import { type BuildingRepository } from '../../modules/building/domain/building.repository.js';

declare module 'fastify' {
    interface FastifyInstance {
        buildingRepository: BuildingRepository;
    }
}

const register = async (app: FastifyInstance) => {
    const repository = new DrizzleBuildingRepository(app.db);

    await app.decorate('buildingRepository', repository);
};

export default fp(register)