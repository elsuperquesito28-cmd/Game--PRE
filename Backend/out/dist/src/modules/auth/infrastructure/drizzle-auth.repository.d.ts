import { type AuthRepository } from '../domain/auth.repository.js';
import { type FastifyInstance } from 'fastify';
export declare class DrizzleAuthRepository implements AuthRepository {
    private db;
    constructor(db: FastifyInstance['db']);
    findUserByUserName: (userName: string) => Promise<{
        id: string;
        user: string;
        password: string;
        gameId: string | null;
    } | null>;
    insertUser: (user: string, password: string, gameId: string) => Promise<void>;
}
//# sourceMappingURL=drizzle-auth.repository.d.ts.map