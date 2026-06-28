/*import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import information from './base.json' with { type: 'json' };
import gameModel from '../../model/model.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const value = req.body;
        const db = new gameModel();
        const user = db.select({
            type: 'get',
            columnsSelect: '*',
            table: 'users',
            condition: 'user',
            value: value.userName
        });
        console.log(user);
        if (user) return res.status(400).json({ error: 'This user are register' });
        if (!value.password)
            return res.status(400).json({ error: 'The camp password are incomplete' });
        console.log(value.password);
        const password = await bcrypt.hash(value.password.toString(), 12);
        const transition = db.transaction(() => {
            1;
            const { coins, clickCoins, level, levelNumber, limit } = information;

            const insertGame = db.prepare({
                type: 'insert game',
                permission: true,
                data: {
                    level,
                    coins,
                    levelNumber,
                    clickCoins,
                    limit
                }
            });

            db.prepare({
                type: 'insert users',
                permission: true,
                data: {
                    user: value.userName,
                    password,
                    gameId: insertGame.lastInsertRowid
                }
            });

            const indexMiner = db.prepare({
                type: 'insert miners'
            });

            information.miners.forEach(n => {
                const { tool, ...m } = n;
                const miner = { ...m, gameId: insertGame.lastInsertRowid };

                const value = { index: indexMiner, data: miner };

                db.run(value);
            });
        });
        transition();
        res.json({ message: 'felicidades a finciinando' });
    } catch (e) {
        console.log(e.message);
    }
});

export default router;
*/