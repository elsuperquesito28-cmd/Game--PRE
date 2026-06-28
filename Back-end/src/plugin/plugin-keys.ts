import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

const __dirname = import.meta.dirname;

const $ = async (el: string[]) => {
    const routeSmall: string[] = ['..', '..', 'keys'];
    const route = [...routeSmall, ...el];
    const routeAbs = join(__dirname, ...route);

    return await readFile(routeAbs, 'utf8');
};

declare module 'fastify' {
    interface FastifyInstance {
        keys: Record<'access' | 'refresh', Record<'private' | 'public', string>>;
    }
}

const registerKeys = async (app: FastifyInstance) => {
    const keys = {
        access: {
            private: await $(['access_private.pem']),
            public: await $(['access_public.pem'])
        },
        refresh: {
            private: await $(['refresh_private.pem']),
            public: await $(['refresh_public.pem'])
        }
    };

    app.decorate('keys', keys);
};

export default fp(registerKeys);
