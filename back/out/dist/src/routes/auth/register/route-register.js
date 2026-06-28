import {} from '@fastify/type-provider-typebox';
import { authBody, authResponse } from '../../../definitions/schemas.js';
import { RegisterHandler } from '../../../modules/auth/infrastructure/fastify-register.controllers.js';
const routeRegister = async (server) => {
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
//# sourceMappingURL=route-register.js.map