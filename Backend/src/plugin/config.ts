import { type FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import util from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../../.env');

const schema = {
    type: 'object',
    required: ['REFRESH_PRIVATE', 'REFRESH_PUBLIC', 'ACCESS_PRIVATE', 'ACCESS_PUBLIC'],
    properties: {
        REFRESH_PRIVATE: { type: 'string' },
        REFRESH_PUBLIC: { type: 'string' },
        ACCESS_PRIVATE: { type: 'string' },
        ACCESS_PUBLIC: { type: 'string' }
    }
};

const properties = [
    'REFRESH_PRIVATE',
    'REFRESH_PUBLIC',
    'ACCESS_PRIVATE',
    'ACCESS_PUBLIC'
] as const;
type keys = (typeof properties)[number];

const envOpts = {
    confKey: 'config',
    schema: schema,
    dotenv: { path: envPath }
};

const signAsync = util.promisify(jwt.sign) as unknown as (
    token: Record<string, string | number>,
    secret: string,
    options?: jwt.SignOptions
) => Promise<string>;

const verifyAsync = util.promisify(jwt.verify) as unknown as (
    token: string,
    secretOrPublicKey: string,
    options?: jwt.VerifyOptions
) => Promise<string>;

type optionsTokens = 'access' | 'refresh';

declare module 'fastify' {
    interface FastifyInstance {
        Keys: {
            REFRESH_PRIVATE: string;
            REFRESH_PUBLIC: string;
            ACCESS_PRIVATE: string;
            ACCESS_PUBLIC: string;
        };
        bcrypt: {
            hash: (password: string) => Promise<string>;
            compare: (password: string, hashedPassword: string) => Promise<boolean>;
        };
        jwt: {
            sign: (
                payload: Record<string, string | number>,
                tokenType: optionsTokens
            ) => Promise<string>;
            verify: (token: string, tokenType: optionsTokens) => Promise<string>;
        };
    }
}

async function authPlugin(fastify: FastifyInstance) {
    // 1. CARGA DEL ENTORNO
    await fastify.register(fastifyEnv, envOpts);
    const jwtKeys = {} as any;

    // 2. FORMATEO DEFINITIVO: Procesa tanto '\n' real como '\\n' de texto
    properties.forEach(n => {
        if (fastify.config && fastify.config[n]) {
            let key = fastify.config[n].trim();

            // 1. Quitamos comillas si se colaron en los extremos
            key = key.replace(/^['"]+|['"]+$/g, '');

            // 2. ¡EL PASO CLAVE! Convertimos los '\n' literales en saltos de línea reales
            key = key.replace(/\\n/g, '\n');

            // 3. Aseguramos que termine en salto de línea exacto como pide RS256
            if (!key.endsWith('\n')) {
                key += '\n';
            }

            jwtKeys[n] = key;
        }
    });

    fastify.decorate('Keys', jwtKeys);

    console.log('=== INSPECCIÓN DE LLAVES EN EL PLUGIN ===');
    console.log('ACCESS_PRIVATE cargada:', !!jwtKeys.ACCESS_PRIVATE);
    console.log('Contenido inicial ACCESS_PRIVATE:', JSON.stringify(jwtKeys.ACCESS_PRIVATE));
    console.log('=========================================');

    fastify.decorate('bcrypt', {
        hash: async (password: string) => {
            const saltRounds = 12;
            return await bcrypt.hash(password, saltRounds);
        },
        compare: async (password: string, hashedPassword: string) => {
            return await bcrypt.compare(password, hashedPassword);
        }
    });

    // 4 y 5. JWT (Búsqueda dinámica en tiempo de ejecución)
    fastify.decorate('jwt', {
        sign: async (payload: Record<string, string | number>, tokenType: optionsTokens) => {
            // Evaluamos las llaves JUSTO CUANDO SE LLAMA A LA FUNCIÓN, usando jwtKeys local
            const isAccess = tokenType === 'access';
            const privateKey = isAccess ? jwtKeys.ACCESS_PRIVATE : jwtKeys.REFRESH_PRIVATE;
            const expiresIn = isAccess ? '15m' : '7d'; // '15m' es el formato correcto

            if (!privateKey) {
                throw new Error(
                    `Error Crítico: La llave privada para [${tokenType}] está indefinida en memoria.`
                );
            }

            console.log('=== INSPECCIÓN DE LLAVES EN EL PLUGIN ===');
            console.log('alooooo');

            console.log('Contenido inicial ACCESS_PRIVATE:', privateKey);
            console.log('=========================================');

            return await signAsync(payload, privateKey, {
                algorithm: 'RS256',
                expiresIn: expiresIn
            });
        },
        verify: async (token: string, tokenType: optionsTokens) => {
            // Evaluamos la llave pública en tiempo de ejecución
            const publicKey =
                tokenType === 'access' ? jwtKeys.ACCESS_PUBLIC : jwtKeys.REFRESH_PUBLIC;

            if (!publicKey) {
                throw new Error(
                    `Error Crítico: La llave pública para [${tokenType}] está indefinida en memoria.`
                );
            }

            return await verifyAsync(token, publicKey, {
                algorithms: ['RS256']
            });
        }
    });
}
export default fp(authPlugin, {
    name: 'authPlugin'
});
