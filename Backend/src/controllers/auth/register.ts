import { type LoginBody } from '/home/proyecto/Backend/src/schemas/auth';
import { type FastifyRequest, type FastifyReply } from 'fastify';
import { type IUser } from '../../type/type';
interface LoginRoute {
    Body: LoginBody;
}

export const register = async (request: FastifyRequest<LoginRoute>, reply: FastifyReply) => {
    const app = request.server;
    try {
        const db = request.server.db;

        const { userName, password } = request.body;

        const user = db.prepare('SELECT * FROM users WHERE user = ?').get(userName) as
            | IUser
            | undefined;

        if (user) return reply.code(404).send({ error: 'This user has exists' });

        console.log(password);

        const passwordHashed = await app.bcrypt.hash(password);
        ///data/user/0/com.foxdebug.acodefree/files/alpine/home/proyecto/Backend/src/controllers/auth/register.ts
         const refreshToken = await app.jwt.sign(
            { gameId: '1' }, //gameId
            'refresh'
        );
        const accessToken = await app.jwt.sign(
            { gameId: '1' }, //gameId
            'access'
        );

        return reply.code(200).send({
            accessToken,
            refreshToken
        });
    } catch (err) {
        app.log.error(err);
        return reply.code(500).send();
    }
};
