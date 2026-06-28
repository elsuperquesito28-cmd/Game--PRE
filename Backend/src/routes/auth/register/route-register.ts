import { type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { authBody, authResponse } from '../../../definitions/schemas.js';
import { RegisterHandler } from '../../../modules/auth/infrastructure/fastify-register.controllers.js';

const routeRegister: FastifyPluginAsyncTypebox = async server => {
    server.route({
        method: 'POST',
        url: '/',
        schema: {
            body: authBody,
            response: authResponse
        },
        handler: RegisterHandler
    });
};

export default routeRegister;
