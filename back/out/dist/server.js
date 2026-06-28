import Fastify from 'fastify';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {} from '@fastify/type-provider-typebox';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = Fastify({
    logger: true
}).withTypeProvider();
await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
});
await app.register(autoLoad, {
    dir: join(__dirname, 'plugin')
});
await app.register(autoLoad, {
    dir: join(__dirname, 'routes')
});
app.get('/', () => {
    return { hello: 'world' };
});
try {
    await app.listen({ port: 3000, host: '127.0.0.1' });
}
catch (err) {
    app.log.error(err);
    process.exit(1);
}
//# sourceMappingURL=server.js.map