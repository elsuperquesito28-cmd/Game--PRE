import { type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
('../../../modules/auth/infrastructure/fastify-register.controllers.js');

import { GetGameIdResponse } from '../../../definitions/schemas.js';
import { GetGameHandler } from '../../../modules/game/infrastructure/fasitfy.game-controllers.js';

const routeRegister: FastifyPluginAsyncTypebox = async server => {
    server.route({
        method: 'GET',
        url: '/',
        schema: {
            response: GetGameIdResponse
        },
        handler: GetGameHandler
    });
};

export default routeRegister;
