import { type AuthRepository } from '../domain/auth.repository.js';
import { type AuthBodyType, type AuthResponse } from '../../../definitions/definitions.js';
export declare class LoginUseCase {
    #private;
    constructor(auth: AuthRepository);
    execute: (credentials: AuthBodyType) => Promise<AuthResponse>;
}
//# sourceMappingURL=login.use-case.d.ts.map