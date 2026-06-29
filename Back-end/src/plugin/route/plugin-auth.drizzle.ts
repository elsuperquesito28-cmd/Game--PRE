import fp from 'fastify-plugin';
import { DrizzleAuthRepository } from '../../modules/auth/infrastructure/drizzle-auth.repository.js';
import { type AuthRepository } from '../../modules/auth/domain/auth.repository.js';
import { type FastifyInstance } from 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        RepositoryAuth: AuthRepository;
    }
}

const register = async (app: FastifyInstance) => {
    const auth = new DrizzleAuthRepository(app.db, app);
    await app.decorate('RepositoryAuth', auth);
};

export default fp(register);
