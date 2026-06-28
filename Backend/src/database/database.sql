CREATE TABLE IF NOT EXISTS game (
  id TEXT PRIMARY KEY ,
  coins INTEGER NOT NULL,
  level INTEGER NOT NULL,
  level_number INTEGER NOT NULL,
  click_coins INTEGER NOT NULL,
  limit_miners INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY ,
  user TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  game_id TEXT,
  FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS miners (
  id TEXT PRIMARY KEY ,
  game_id TEXT NOT NULL,
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
  id TEXT PRIMARY KEY ,
  miner_id TEXT,
  game_id TEXT NOT NULL,
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
  id TEXT PRIMARY KEY ,
  game_id TEXT NOT NULL,
  mineral_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS miners_name (
  id TEXT PRIMARY KEY ,
  type TEXT NOT NULL,
  count INTEGER NOT NULL,
  game_id TEXT NOT NULL,
  FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS buildings (
  id TEXT PRIMARY KEY ,
  game_id TEXT NOT NULL,
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
  id TEXT PRIMARY KEY ,
  game_id TEXT NOT NULL,
  type TEXT NOT NULL,
  cost INTEGER NOT NULL,
  max_level INTEGER NOT NULL,
  FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tools_base (
  id TEXT PRIMARY KEY ,
  game_id TEXT NOT NULL,
  type TEXT NOT NULL,
  cost INTEGER NOT NULL,
  max_level INTEGER NOT NULL,
  FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mapping (
  game_id TEXT NOT NULL,
  front_id TEXT UNIQUE NOT NULL,
  back_id TEXT UNIQUE NOT NULL,
  PRIMARY KEY (game_id, front_id)
);

CREATE TABLE IF NOT EXISTS pending (
  game_id TEXT NOT NULL,
  request_id TEXT NOT NULL,
  result TEXT,
  completed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (game_id, request_id),
  FOREIGN KEY(game_id) REFERENCES game(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_miners_game ON miners(game_id);
CREATE INDEX IF NOT EXISTS idx_tools_game ON tools(game_id);
CREATE INDEX IF NOT EXISTS idx_inventory_game ON inventory(game_id);
CREATE INDEX IF NOT EXISTS idx_buildings_game ON buildings(game_id);
CREATE INDEX IF NOT EXISTS idx_miners_base_game ON miners_base(game_id);
CREATE INDEX IF NOT EXISTS idx_tools_base_game ON tools_base(game_id);
CREATE INDEX IF NOT EXISTS idx_miners_name_game ON miners_name(game_id);
CREATE INDEX IF NOT EXISTS idx_mapping_game ON mapping(game_id);
CREATE INDEX IF NOT EXISTS idx_pending_game ON pending(game_id);