import { users } from '../../../database/schema.js';
import { type AuthRepository } from '../domain/auth.repository.js';
import { eq } from 'drizzle-orm';
import { type FastifyInstance } from 'fastify';
import { generateGameId } from 'shared';

export class DrizzleAuthRepository implements AuthRepository {
    constructor(private db: FastifyInstance['db']) {}

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
}
