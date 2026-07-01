import { users } from '../../../database/schema.js';
import {
    type AuthRepository,
    type ValuesHash,
    type ValuesCompare
} from '../domain/auth.repository.js';
import { eq } from 'drizzle-orm';
import { type FastifyInstance } from 'fastify';
import { generateGameId } from 'shared';

interface PayloadDates {
    userId: string;
    gameId: string;
}

interface UserDates {
  gameId:string,
  password:string
  username:string
}

export class DrizzleAuthRepository implements AuthRepository {
    private db: FastifyInstance['db'];
    private server: FastifyInstance;
    constructor(db: FastifyInstance['db'], fastify: FastifyInstance) {
        this.db = db;
        this.server = fastify;
    }

    findUserByUserName = async (userName: string) => {
        const user = await this.db.select().from(users).where(eq(users.user, userName)).get();

        return user || null;
    };

    insertUser = async ({username, password, gameId}:UserDates) => {
        this.db.insert(users).values({
            username,
            password,
            gameId,
            id: generateGameId()
        });
    };

    generateToken = (payload: PayloadDates): Record<'refreshToken' | 'accessToken', string> => {
        const refreshToken = this.server.sign(payload, 'refresh');
        const accessToken = this.server.sign(payload, 'access');

        return { refreshToken, accessToken };
    };

    hash = async (values: ValuesHash): Promise<string> => {
        try {
            const hash = await this.server.hash(values);

            return hash;
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error('Ocurrió un error desconocido');
        }
    };

    compare = async (values: ValuesCompare): Promise<boolean> => {
        try {
            const compare: boolean = await this.server.compare(values);

            return compare;
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }

            throw new Error('Ocurrió un error desconocido');
        }
    };
}
