import {} from '../domain/auth.repository.js';
import {} from '../../../definitions/definitions.js';
export class RegisterUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute = async (credentials) => {
        const user = await this.authRepository.findUserByUserName(credentials.userName);
        if (user) {
            throw new Error('User Register');
            return null;
        }
        return {
            accessToken: '',
            refreshToken: ''
        };
    };
}
//# sourceMappingURL=register.use-case.js.map