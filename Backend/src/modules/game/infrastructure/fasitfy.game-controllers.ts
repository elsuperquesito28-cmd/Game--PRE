import { type RouteHandler } from 'fastify';
import { type GameReaponse, type GameIdQueryStringType } from '../../../definitions/definitions.js';
import { DrizzleGameRepository } from './drizzle-game.repository.js';
import { GameUseCase } from '../application/game.use-case.js';

export const GetGameHandler: RouteHandler<{
    Reply: GameReaponse;
    Params: GameIdQueryStringType;
}> = async (request, reply) => {
    try {
        const DrizzleRepository = new DrizzleGameRepository(request.server.db);
        const useCase = new GameUseCase(DrizzleRepository);

        const game = await useCase.execute(request.params);

        if (game) reply.status(200).send(game);
    } catch (e) {
        if (e instanceof Error && e.message === 'Game not found')
            return reply.status(404).send({ error: 'Game not found' });

        return reply.status(500).send({ error: 'Internal error' });
    }
};
