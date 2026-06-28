import { type TypeDB } from '../database/db.js';
declare module 'fastify' {
    interface FastifyInstance {
        db: TypeDB;
    }
}
declare const _default: (app: import("fastify").FastifyInstance<import("fastify").RawServerDefault, import("node:http").IncomingMessage, import("node:http").ServerResponse<import("node:http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>) => Promise<void>;
export default _default;
//# sourceMappingURL=database-plugin.d.ts.map