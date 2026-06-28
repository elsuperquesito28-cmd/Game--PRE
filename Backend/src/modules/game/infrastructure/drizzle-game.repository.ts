import { mapping } from './mapping.js';
import { type GameRepository } from '../domain/game.repository.js';
import { type GameEntity } from '../domain/game.entity.js';

import { game } from '../../../database/schema.js';
import { type FastifyInstance } from 'fastify';
import { eq } from 'drizzle-orm';

export class DrizzleGameRepository implements GameRepository {
    constructor(private db: FastifyInstance['db']) {}

    findGameById = async (id: string): Promise<GameEntity | null> => {
        const gameFind = await this.db.query.game.findFirst({
            where: eq(game.id, id),
            with: {
                inventory: true,
                miners: {
                    with: {
                        tools: true
                    }
                }
            }
        });

        if (!gameFind) return null;
        const mapped = mapping(gameFind);

        return mapped || null;
    };

    insertNewGame = async () => {
        return 'hola';
    };
}
