import { users } from '../../../database/schema.js';
import {} from '../domain/auth.repository.js';
import { eq } from 'drizzle-orm';
import {} from 'fastify';
import { generateGameId } from 'shared';
export class DrizzleAuthRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    findUserByUserName = async (userName) => {
        const user = await this.db.select().from(users).where(eq(users.user, userName)).get();
        return user || null;
    };
    insertUser = async (user, password, gameId) => {
        this.db.insert(users).values({
            user,
            password,
            gameId,
            id: generateGameId()
        });
    };
}
//# sourceMappingURL=drizzle-auth.repository.js.map