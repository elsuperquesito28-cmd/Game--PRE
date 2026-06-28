import { type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { LoginHandler } from '../../../modules/auth/infrastructure/fastify-login.controllers.js';
import { authBody, authResponse } from '../../../definitions/schemas.js';

const LoginRoute: FastifyPluginAsyncTypebox = async server => {
    server.route({
        method: 'POST',
        url: '/',
        schema: {
            body: authBody,
            response: authResponse
        },
        handler: LoginHandler
    });
};

export default LoginRoute;
