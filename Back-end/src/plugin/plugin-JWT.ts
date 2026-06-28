import JWT from 'jsonwebtoken';
import { type Algorithm, type SignOptions } from 'jsonwebtoken';

import fp from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

type tokensTypes = 'access' | 'refresh';

const expires: Record<tokensTypes, string> = {
    access: '15m',
    refresh: '20d'
};

interface PayloadDates {
    userId: string;
    gameId: string;
}

declare module 'fastify' {
    interface FastifyInstance {
        sign: (payload: PayloadDates, type: tokensTypes) => string;
        verify: (token: string, type: tokensTypes) => PayloadDates | false;
    }
}

const sign = (
    payload: PayloadDates,
    type: tokensTypes,
    fastify: FastifyInstance
): Promise<string> => {
    const privateKey = fastify.keys[type].private;

    const options: SignOptions = {
        expiresIn: expires[type],
        algorithm: 'RS256' as Algorithm
    } as SignOptions;
    const tokenSign = JWT.sign(payload, privateKey, options);

    return tokenSign;
};

const verify = (
    token: string,
    type: tokensTypes,
    fastify: FastifyInstance
): PayloadDates | false => {
    try {
        const publicKey = fastify.keys[type].public;

        const payload = JWT.verify(token, publicKey) as PayloadDates;

        return payload;
    } catch (e) {
        return false;
    }
};

const registerFunctions = async (app: FastifyInstance) => {
    await app.decorate('sign', (payload: PayloadDates, type: tokensTypes) =>
        sign(payload, type, app)
    );

    await app.decorate('verify', (token: string, type: tokensTypes) => verify(token, type, app));
};

export default fp(registerFunctions);
