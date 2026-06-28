import { type RouteHandler } from 'fastify';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';
import { DrizzleAuthRepository } from './drizzle-auth.repository.js';
import { LoginUseCase } from '../application/login.use-case.js';

export const LoginHandler: RouteHandler<{
    Body: AuthBodyType;
    Reply: AuthResponse;
}> = async (request, reply) => {
    const auhtRepository = new DrizzleAuthRepository(request.server.db);
    const loginUseCase = new LoginUseCase(auhtRepository);
    try {
        const result = await loginUseCase.execute(request.body);

        return reply.status(200).send(result);
    } catch (e) {
        if (e === 'User Register')
            return reply.status(401).send({ error: 'This user name has register' });
    }
};
