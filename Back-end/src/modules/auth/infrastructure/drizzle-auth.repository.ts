import { users } from '../../../database/schema.js';
import { type AuthRepository } from '../domain/auth.repository.js';
import { eq } from 'drizzle-orm';
import { type FastifyInstance } from 'fastify';
import { generateGameId } from 'shared';

interface PayloadDates {
    userId: string;
    gameId: string;
}

export class DrizzleAuthRepository implements AuthRepository {
    private db: FastifyInstance['db'];
    private server: FastifyInstance['server'];
    constructor(db, fastify) {
        this.db = db;
        this.server = fastify;
    }

    findUserByUserName = async (userName: string) => {
        const user = await this.db.select().from(users).where(eq(users.user, userName)).get();

        return user || null;
    };

    insertUser = async (user: string, password: string, gameId: string) => {
        this.db.insert(users).values({
            user,
            password,
            gameId,
            id: generateGameId()
        });
    };

    generateToken = (payload: PayloadDates):Record<'refreshToken'|'accessToken', string> => {
        const refreshToken = this.server.sign(payload, 'refresh');
        const accessToken = this.server.sign(payload, 'access');

        return { refreshToken, accessToken };
    };
}
