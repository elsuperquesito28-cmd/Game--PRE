import { type RouteHandler } from 'fastify';
import { type GameReaponse, type GameIdQueryStringType } from '../../../definitions/definitions.js';

import { GameUseCase } from '../application/game.use-case.js';

export const GetGameHandler: RouteHandler<{
    Reply: GameReaponse;
    Params: GameIdQueryStringType;
}> = async (request, reply) => {
    try {
        const repository = request.server.gameRepository;
        const useCase = new GameUseCase(repository);

        const game = await useCase.execute(request.params);

        if (game) reply.status(200).send(game);
    } catch (e) {
        if (e instanceof Error && e.message === 'Game not found')
            return reply.status(404).send({ error: 'Game not found' });

        return reply.status(500).send({ error: 'Internal error' });
    }
};
