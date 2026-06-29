import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';
import bycryptjs from 'bcryptjs';

interface ParamsHash {
    salt: number;
    password: string;
}

interface ParamsCompare {
    password: string;
    hash: string;
}

declare module 'fastify' {
    interface FastifyInstance {
        hash: (values: ParamsHash) => Promise<string>;
        compare: (values: ParamsCompare) => Promise<boolean>;
    }
}

/**
 * @param values.salt - Define la cantudad de saltos
 * @param values.password - define le contraseña
 */
const hash = async ({ salt, password }: ParamsHash) => {
    try {
        const salts = await bycryptjs.genSalt(salt);
        const hash: string = await bycryptjs.hash(password, salts);

        return hash;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }

        throw new Error('Ocurrió un error desconocido');
    }
};

const compare = async ({ password, hash }: ParamsCompare): Promise<boolean> => {
    return await bycryptjs.compare(password, hash);
};

const register = async (app: FastifyInstance) => {
    await app.decorate('hash', hash);

    await app.decorate('compare', compare);
};

export default fp(register);
