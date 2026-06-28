import { type UserEntity } from './user.entity.js';
export interface AuthRepository {
    findUserByUserName: (user: string) => Promise<UserEntity | null>;
    insertUser: (user: string, password: string, gameId: string) => Promise<void>;
}
//# sourceMappingURL=auth.repository.d.ts.map