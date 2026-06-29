import { type RouteHandler } from 'fastify';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';

import { RegisterUseCase } from '../application/register.use-case.js';

export const RegisterHandler: RouteHandler<{
    Body: AuthBodyType;
    Reply: AuthResponse;
}> = async (request, reply) => {
    const app = request.server;

    const repository = app.RepositoryAuth;
    const loginUseCase = new RegisterUseCase(repository);

    try {
        const result = await loginUseCase.execute(request.body);
        if (result) return reply.status(200).send(result);
    } catch (e) {
        if (e === 'User Register')
            return reply.status(404).send({ error: 'Username has register' });

        if ((e = 'Invalid password')) return reply.status(401).send({ error: 'Invalid password' });
    }
};
