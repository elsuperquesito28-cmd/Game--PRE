import { type AuthRepository } from '../domain/auth.repository.js';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';

export class RegisterUseCase {
    constructor(private authRepository: AuthRepository) {}
    execute = async ({ password, userName }: AuthBodyType): Promise<AuthResponse | null> => {
        const user = await this.authRepository.findUserByUserName(userName);

        if (user) {
            throw new Error('User Register');
            return null;
        }

        const passwordHash: string = await this.authRepository.hash({ password, salt: 13 });

        return {
            accessToken: '',
            refreshToken: ''
        };
    };
}
