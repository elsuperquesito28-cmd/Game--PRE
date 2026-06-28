import { type FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

import { BuildingResponse } from '../../../../definitions/definitions.schema-primitives/building.js';

import { BuildingHanlder } from '../../../../modules/building/infrastructure/fastify.building-controller.js';

const RouteGetBuilding: FastifyPluginAsyncTypebox = async server => {
    server.route({
        method: 'GET',
        url: '/',
        schema: {
            response: BuildingResponse
        },
        handler: BuildingHanlder
    });
};

export default RouteGetBuilding;
