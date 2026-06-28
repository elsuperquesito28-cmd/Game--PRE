import fp from 'fastify-plugin';
import { db, type TypeDB } from '../database/db.js';

declare module 'fastify' {
    interface FastifyInstance {
        db: TypeDB;
    }
}

export default fp(async app => {
    console.log('DB plugin registrado');
    app.decorate('db', db);

    app.addHook('onClose', async () => {
        db.$client.close();
    });
});
