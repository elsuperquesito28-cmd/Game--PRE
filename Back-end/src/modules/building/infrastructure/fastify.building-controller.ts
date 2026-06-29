import { type RouteHandler } from 'fastify';

import { type BuildingReaponse, type BuildingParams } from '../../../definitions/definitions.js';

import { BuildingUseCaseGet } from '../application/get-building.use-case.js';

export const BuildingHanlder: RouteHandler<{
    Params: BuildingParams;
    Reply: BuildingReaponse;
}> = async (request, reply) => {
    const repository = request.server.buildingRepository

    const useCase = new BuildingUseCaseGet(repository);

    try {
        const buildings = await useCase.execute(request.params);

        if (buildings) return reply.status(200).send(buildings);
    } catch (e) {
        if (e instanceof Error && e.message === 'The gameId are incorrect')
            return reply.status(404).send({ error: 'This gameId not exists' });

        return reply.status(500).send({ error: 'Error of server' });
    }
};
