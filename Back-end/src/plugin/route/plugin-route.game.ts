import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

import { DrizzleGameRepository } from '../../modules/game/infrastructure/drizzle-game.repository.js';
import { type GameRepository } from '../../modules/game/domain/game.repository.js';

declare module 'fastify' {
    interface FastifyInstance {
        gameRepository: GameRepository;
    }
}

const regiter = async (app: FastifyInstance) => {
    const repositoryGame = new DrizzleGameRepository(app.db);

    await app.decorate('gameRepository', repositoryGame);
};

export default fp(regiter);
