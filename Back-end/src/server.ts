import { BuildApp } from '../build-server.js';

const app = await BuildApp();

try {
    await app.listen({ port: 3000, host: '127.0.0.1' });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
