import { type AuthRepository } from '../domain/auth.repository.js';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';
export declare class RegisterUseCase {
    private authRepository;
    constructor(authRepository: AuthRepository);
    execute: (credentials: AuthBodyType) => Promise<AuthResponse | null>;
}
//# sourceMappingURL=register.use-case.d.ts.map