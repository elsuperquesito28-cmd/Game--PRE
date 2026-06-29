import { type UserEntity } from './user.entity.js';
interface PayloadDates {
    userId: string;
    gameId: string;
}

export interface ValuesHash {
    password: string;
    salt: number;
}

export interface ValuesCompare {
    password: string;
    hash: string;
}

export interface AuthRepository {
    findUserByUserName: (user: string) => Promise<UserEntity | null>;
    insertUser: (user: string, password: string, gameId: string) => Promise<void>;
    generateToken: (payload: PayloadDates) => Record<'refreshToken' | 'accessToken', string>;
    hash: (values: ValuesHash) => Promise<string>;
    compare: (values: ValuesCompare) => Promise<boolean>;
}
