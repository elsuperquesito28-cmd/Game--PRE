import Fastify from 'fastify';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const BuildApp = async () => {
    const app = Fastify({
        logger: true,
        pluginTimeout: 60000
    }).withTypeProvider<TypeBoxTypeProvider>();

    await app.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    });

    await app.register(autoLoad, {
        dir: join(__dirname,'src', 'plugin')
    });

    await app.register(autoLoad, {
        dir: join(__dirname,'src', 'routes'),
        dirNameRoutePrefix(_folderParent, folderName) {
            if (folderName.startsWith('_')) {
                return ':' + folderName.slice(1);
            }
            return folderName;
        }
    });
    
   await app.ready()
    
    return app
};
