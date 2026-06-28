import {} from '../domain/auth.repository.js';
import {} from '../../../definitions/definitions.js';
export class LoginUseCase {
    #authRepository;
    constructor(auth) {
        this.#authRepository = auth;
    }
    execute = async (credentials) => {
        const user = await this.#authRepository.findUserByUserName(credentials.userName);
        if (!user)
            throw new Error('User not found');
        if (user.password !== credentials.password)
            throw new Error('Invalid password');
        return {
            refreshToken: '',
            accessToken: ''
        };
    };
}
//# sourceMappingURL=login.use-case.js.map