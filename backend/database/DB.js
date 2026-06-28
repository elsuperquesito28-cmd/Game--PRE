import Database from 'better-sqlite3';
const db = new Database('Drit_to_Diamond', { verbose: console.log });

db.pragma('journal_mode = WAL ');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS game (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coins INTEGER NOT NULL,
    level INTEGER NOT NULL,
    level_number INTEGER NOT NULL,
    click_coins INTEGER NOT NULL,
    limit_miners INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    game_id INTEGER,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS miners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    force INTEGER NOT NULL,
    level INTEGER NOT NULL,
    max_level INTEGER NOT NULL,
    cost INTEGER NOT NULL,
    cost_improvement INTEGER NOT NULL,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    miner_id INTEGER,
    game_id INTEGER NOT NULL,
    tool_type TEXT NOT NULL,
    tool_cost INTEGER NOT NULL,
    tool_cost_improvement INTEGER NOT NULL,
    tool_level INTEGER NOT NULL,
    fortune_level INTEGER NOT NULL,
    efficiency_level INTEGER NOT NULL,
    max_level INTEGER NOT NULL,
    availability INTEGER NOT NULL,
    FOREIGN KEY(miner_id) REFERENCES miners(id) ON DELETE SET NULL,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    mineral_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS miners_name (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    count INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS buildings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    size INTEGER NOT NULL,
    cost INTEGER NOT NULL,
    quantity_improvement INTEGER NOT NULL,
    level INTEGER NOT NULL,
    max_level INTEGER NOT NULL,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS miners_base (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    cost INTEGER NOT NULL,
    cost_improvement INTEGER NOT NULL,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tools_base (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    cost INTEGER NOT NULL,
    cost_improvement INTEGER NOT NULL,
    FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);
`);

export default db;
