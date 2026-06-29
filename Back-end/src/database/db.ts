import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqlite = new Database(join(__dirname, 'local.db'), { verbose: console.log });
sqlite.exec(
    "INSERT OR IGNORE INTO game (id, coins, level, level_number, click_coins, limit_miners) VALUES ('hola', 100, 1, 1, 1, 5);"
);
sqlite.exec(
    "INSERT OR IGNORE INTO users (id, game_id, user, password) VALUES ('user1', 'hola', 'elsuperquesito', '1838');"
);
sqlite.exec(
    "INSERT OR IGNORE INTO miners (id, game_id, type, name, force, level, max_level, cost, cost_improvement) VALUES ('miner1', 'hola', 'beginner', 'MinerName1', 50, 2, 25, 100, 250);"
);
sqlite.exec(
    "INSERT OR IGNORE INTO buildings (id, game_id, type, cost, quantity_improvement, level, max_level, quantity, size) values ('edificio1', 'hola', 'small', 100, 3, 500, 3, 50, 600 );"
);

export const db = drizzle(sqlite, { schema });

export type TypeDB = typeof db;
