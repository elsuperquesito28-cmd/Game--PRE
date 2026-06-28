import {} from 'fastify';
import {} from '../../../definitions/definitions.js';
import { DrizzleAuthRepository } from './drizzle-auth.repository.js';
import { RegisterUseCase } from '../application/register.use-case.js';
export const RegisterHandler = async (request, reply) => {
    const auhtRepository = new DrizzleAuthRepository(request.server.db);
    const loginUseCase = new RegisterUseCase(auhtRepository);
    try {
        const result = await loginUseCase.execute(request.body);
        if (result)
            return reply.status(200).send(result);
    }
    catch (e) {
        if (e === 'User not found')
            return reply.status(404).send({ error: 'User not found' });
        if ((e = 'Invalid password'))
            return reply.status(401).send({ error: 'Invalid password' });
    }
};
//# sourceMappingURL=fastify-register.controllers.js.map