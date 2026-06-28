import os from 'os';

os.networkInterfaces = () => ({});

import Fastify from 'fastify';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                colorize: true
            }
        }
    }
});
await app.register(cors, {
    origin: '*', // En producción cambia esto por el dominio de tu app/frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

app.addHook('preHandler', async request => {
    const datosLimpios = {
        method: request.method,
        url: request.url,
        body: request.body || 'Sin datos',
        client: request.ip,
        navegator: request.headers['user-agent']
    };

    app.log.info(datosLimpios);
});

await app.register(autoLoad, {
    dir: join(__dirname, 'plugin')
});

await app.register(autoLoad, {
    dir: join(__dirname, 'router')
    //routeParams: true,
    //indexPattern: /^index\.(ts|js)$/
});

app.get('/', async () => {
    return { hello: 'world' };
});

try {
    await app.listen({ port: 3000, host: '127.0.0.1' });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
