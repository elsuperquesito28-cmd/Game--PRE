import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

import { relations } from 'drizzle-orm';

// 1. Tabla GAME
export const game = sqliteTable('game', {
    id: text('id').primaryKey(),
    coins: integer('coins').notNull(),
    level: integer('level').notNull(),
    levelNumber: integer('level_number').notNull(),
    clickCoins: integer('click_coins').notNull(),
    limitMiners: integer('limit_miners').notNull()
});

// 2. Tabla USERS
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    user: text('user').notNull().unique(),
    password: text('password').notNull(),
    gameId: text('game_id').references(() => game.id, { onDelete: 'set null' })
});

// 3. Tabla MINERS
export const miners = sqliteTable(
    'miners',
    {
        id: text('id').primaryKey(),
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' }),
        type: text('type').notNull(),
        name: text('name').notNull(),
        force: integer('force').notNull(),
        level: integer('level').notNull(),
        maxLevel: integer('max_level').notNull(),
        cost: integer('cost').notNull(),
        costImprovement: integer('cost_improvement').notNull()
    },
    table => ({
        idxMinersGame: index('idx_miners_game').on(table.gameId)
    })
);

// 4. Tabla TOOLS
export const tools = sqliteTable(
    'tools',
    {
        id: text('id').primaryKey(),
        minerId: text('miner_id').references(() => miners.id, { onDelete: 'set null' }),
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' }),
        toolType: text('tool_type').notNull(),
        toolCost: integer('tool_cost').notNull(),
        toolCostImprovement: integer('tool_cost_improvement').notNull(),
        toolLevel: integer('tool_level').notNull(),
        fortuneLevel: integer('fortune_level').notNull(),
        efficiencyLevel: integer('efficiency_level').notNull(),
        maxLevel: integer('max_level').notNull(),
        availability: integer('availability').notNull(),
        value: integer('value').notNull()
    },
    table => ({
        idxToolsGame: index('idx_tools_game').on(table.gameId)
    })
);

// 5. Tabla INVENTORY
export const inventory = sqliteTable(
    'inventory',
    {
        id: text('id').primaryKey(),
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' }),
        mineralName: text('mineral_name').notNull(),
        quantity: integer('quantity').notNull()
    },
    table => ({
        idxInventoryGame: index('idx_inventory_game').on(table.gameId)
    })
);

// 6. Tabla MINERS_NAME
export const minersName = sqliteTable(
    'miners_name',
    {
        id: text('id').primaryKey(),
        type: text('type').notNull(),
        count: integer('count').notNull(),
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' })
    },
    table => ({
        idxMinersNameGame: index('idx_miners_name_game').on(table.gameId)
    })
);

// 7. Tabla BUILDINGS
export const buildings = sqliteTable(
    'buildings',
    {
        id: text('id').primaryKey(),
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' }),
        type: text('type').notNull(),
        quantity: integer('quantity').notNull(),
        size: integer('size').notNull(),
        cost: integer('cost').notNull(),
        quantityImprovement: integer('quantity_improvement').notNull(),
        level: integer('level').notNull(),
        maxLevel: integer('max_level').notNull()
    },
    table => ({
        idxBuildingsGame: index('idx_buildings_game').on(table.gameId)
    })
);

// 8. Tabla MINERS_BASE
export const minersBase = sqliteTable(
    'miners_base',
    {
        id: text('id').primaryKey(),
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' }),
        type: text('type').notNull(),
        cost: integer('cost').notNull(),
        maxLevel: integer('max_level').notNull()
    },
    table => ({
        idxMinersBaseGame: index('idx_miners_base_game').on(table.gameId)
    })
);

// 9. Tabla TOOLS_BASE
export const toolsBase = sqliteTable(
    'tools_base',
    {
        id: text('id').primaryKey(),
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' }),
        type: text('type').notNull(),
        cost: integer('cost').notNull(),
        maxLevel: integer('max_level').notNull()
    },
    table => ({
        idxToolsBaseGame: index('idx_tools_base_game').on(table.gameId)
    })
);

// 10. Tabla MAPPING (Llave primaria compuesta y restricciones UNIQUE)
export const mapping = sqliteTable(
    'mapping',
    {
        gameId: text('game_id').notNull(),
        frontId: text('front_id').notNull().unique(),
        backId: text('back_id').notNull().unique()
    },
    table => ({
        pk: primaryKey({ columns: [table.gameId, table.frontId] }),
        idxMappingGame: index('idx_mapping_game').on(table.gameId)
    })
);

// 11. Tabla PENDING (Llave primaria compuesta y valor por defecto de fecha)
export const pending = sqliteTable(
    'pending',
    {
        gameId: text('game_id')
            .notNull()
            .references(() => game.id, { onDelete: 'cascade' }),
        requestId: text('request_id').notNull(),
        result: text('result'),
        completed: integer('completed').notNull().default(0),
        createdAt: text('created_at')
            .notNull()
            .default(sql`(datetime('now'))`)
    },
    table => ({
        pk: primaryKey({ columns: [table.gameId, table.requestId] }),
        idxPendingGame: index('idx_pending_game').on(table.gameId)
    })
);

export const gameRelations = relations(game, ({ many, one }) => ({
    miners: many(miners),
    inventory: many(inventory),
    buildings: many(buildings),
    toolsBase: many(toolsBase),
    minersBase: many(minersBase),
    minersName: many(minersName),
    tools: many(tools),
    user: one(users, {
        fields: [game.id],
        references: [users.gameId]
    })
}));

// 1. Relaciones de Mineros (Corregido para retornar el objeto correctamente)
export const minersRelations = relations(miners, ({ one }) => ({
    game: one(game, {
        fields: [miners.gameId],
        references: [game.id]
    }),
    tools: one(tools)
}));

// 2. Relaciones de Herramientas
export const toolsRelations = relations(tools, ({ one }) => ({
    miner: one(miners, {
        fields: [tools.minerId],
        references: [miners.id]
    }),
    game: one(game, {
        fields: [tools.gameId],
        references: [game.id]
    })
}));

// 3. Relaciones del Inventario / Minerales
export const inventoryRelations = relations(inventory, ({ one }) => ({
    game: one(game, {
        fields: [inventory.gameId],
        references: [game.id]
    })
}));
