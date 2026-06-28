import { type AuthRepository } from '../domain/auth.repository.js';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';

export class RegisterUseCase {
    constructor(private authRepository: AuthRepository) {}
    execute = async (credentials: AuthBodyType): Promise<AuthResponse | null> => {
        const user = await this.authRepository.findUserByUserName(credentials.userName);

        if (user) {
            throw new Error('User Register');
            return null;
        }

        return {
          accessToken:'',
          refreshToken:''
        };
    };
}
