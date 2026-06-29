import { type AuthRepository } from '../domain/auth.repository.js';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';

export class LoginUseCase {
    private authRepository;
    constructor(auth: AuthRepository) {
        this.authRepository = auth;
    }

    execute = async (credentials: AuthBodyType): Promise<AuthResponse> => {
        const user = await this.authRepository.findUserByUserName(credentials.userName);

        if (!user) throw new Error('User not found');

        const values = {
            password: credentials.password,
            hash: user.password
        };

        const compare: boolean =await this.authRepository.compare(values);

        if (!compare) throw new Error('Invalid password');

        return this.authRepository.generateToken({ userId: user.id, gameId: String(user.gameId) });
    };
}
