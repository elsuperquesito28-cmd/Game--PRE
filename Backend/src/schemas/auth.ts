export const authBody = {
    type: 'object',
    properties: {
        userName: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['userName', 'password']
} as const;

export const authResponse = {
    200: {
        type: 'object',
        properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' }
        }
    },
    401: {
        type: 'object',
        properties: {
            error: { type: 'string' }
        }
    }
} as const;

export interface LoginBody {
    userName: string;
    password: string;
}
