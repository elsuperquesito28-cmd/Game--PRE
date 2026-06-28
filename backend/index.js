import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './database/DB.js';
//import authRouter from './routers/auth/auth.js';

const app = express();

app.use(cors());
app.use(express.json());
//app.use('/auth', authRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log('servidor ivo en el puerto 3000');
    const games = db.prepare('SELECT * FROM game').all();
    const users = db.prepare('SELECT * FROM users').all();
    console.log(games, users);
    console.log(globalThis.fetch);
});
