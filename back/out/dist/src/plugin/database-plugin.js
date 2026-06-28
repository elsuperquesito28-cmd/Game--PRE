import fp from 'fastify-plugin';
import { db } from '../database/db.js';
export default fp(async (app) => {
    console.log('DB plugin registrado');
    app.decorate('db', db);
    app.addHook('onClose', async () => {
        db.$client.close();
    });
});
//# sourceMappingURL=database-plugin.js.map