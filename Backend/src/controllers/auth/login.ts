import { type LoginBody } from '/home/proyecto/Backend/src/schemas/auth';
import { type FastifyRequest, type FastifyReply } from 'fastify';
import { type IUser } from '../../type/type';
interface LoginRoute {
    Body: LoginBody;
}

export const login = async (request: FastifyRequest<LoginRoute>, reply: FastifyReply) => {
    const db = request.server.db;
    const app = request.server;

    const { userName, password } = request.body;

    const user = db.prepare('SELECT * FROM users WHERE user = ?').get(userName) as
        | IUser
        | undefined;

    if (!user) return reply.code(404).send({ error: 'User not found' });
    const aprobedPassword = app.bcrypt.compare(password, user.password);

    if (!aprobedPassword) return reply.code(401).send({ error: 'Password incorrect' });
    if (user.game_id) {
        const refreshToken = app.jwt.sign({ gameId: user.game_id }, 'refresh');
        const accessToken = app.jwt.sign({ gameId: user.game_id }, 'access');

        return reply.code(200).send({
            accessToken,
            refreshToken
        });
    } else {
        return reply.code(401).send({ error: 'You need a party for regiter' });
    }
};
