import { BuildApp } from '../build-server.js';
import { describe, it, expect } from 'vitest';

describe('/login', async () => {
    const app = await BuildApp();

    it('Deberia llegarle una peticion y devolver un accessTokency un RefreshToken si existe el usuario', async () => {
        const payload = {
            userName: 'elsuperquesito',
            password: '1838'
        };

        const result = await app.inject({
            method: 'POST',
            url: '/auth/login',
            payload
        });
        app.log.info(result.json());
        expect(result.json()).toHaveProperty('accessToken');
        expect(result.json()).toHaveProperty('refreshToken');
    });
});
