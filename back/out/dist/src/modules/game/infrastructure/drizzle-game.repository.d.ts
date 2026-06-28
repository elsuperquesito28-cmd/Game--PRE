import { type GameRepository } from '../domain/game.repository.js';
import { type GameEntity } from '../domain/game.entity.js';
import { type FastifyInstance } from 'fastify';
export declare class DrizzleGameRepository implements GameRepository {
    private db;
    constructor(db: FastifyInstance['db']);
    findGameById: (id: string) => Promise<GameEntity | null>;
    insertNewGame: () => Promise<string>;
}
//# sourceMappingURL=drizzle-game.repository.d.ts.map