import { type RouteHandler } from 'fastify';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';

import { LoginUseCase } from '../application/login.use-case.js';

export const LoginHandler: RouteHandler<{
    Body: AuthBodyType;
    Reply: AuthResponse;
}> = async (request, reply) => {
    const app = request.server;

    const repository = app.RepositoryAuth;
    const loginUseCase = new LoginUseCase(repository);
    try {
        const result = await loginUseCase.execute(request.body);

        

        return reply.status(200).send(result);
    } catch (e) {
        if (e === 'User Register')
            return reply.status(401).send({ error: 'This user name has register' });
    }
};
