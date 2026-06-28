import { mapping } from './mapping.js';
import {} from '../domain/game.repository.js';
import {} from '../domain/game.entity.js';
import { game } from '../../../database/schema.js';
import {} from 'fastify';
import { eq } from 'drizzle-orm';
export class DrizzleGameRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    findGameById = async (id) => {
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
        if (!gameFind)
            return null;
        const mapped = mapping(gameFind);
        return mapped || null;
    };
    insertNewGame = async () => {
        return 'hola';
    };
}
//# sourceMappingURL=drizzle-game.repository.js.map