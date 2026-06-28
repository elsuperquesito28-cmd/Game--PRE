import { type AuthRepository } from '../domain/auth.repository.js';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';

export class LoginUseCase {
    #authRepository;
    constructor(auth: AuthRepository) {
        this.#authRepository = auth;
    }

    execute = async (credentials: AuthBodyType): Promise<AuthResponse> => {
        const user = await this.#authRepository.findUserByUserName(credentials.userName);

        if (!user) throw new Error('User not found');

        if (user.password !== credentials.password) throw new Error('Invalid password');

        return {
            refreshToken: '',
            accessToken: ''
        };
    };
}
