import Database from 'better-sqlite3';
import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'node:path';

const sqlPath = path.join(process.cwd(), 'src', 'database', 'Database.sql');

const sqlFile = fs.readFileSync(sqlPath, 'utf8');

declare module 'fastify' {
    interface FastifyInstance {
        db: Database.Database;
    }
}

export default fp(async fastify => {
    const db = new Database('Dirt to diamond');
    db.exec(sqlFile);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    fastify.decorate('db', db);
});
