CREATE TABLE `buildings` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`type` text NOT NULL,
	`quantity` integer NOT NULL,
	`size` integer NOT NULL,
	`cost` integer NOT NULL,
	`quantity_improvement` integer NOT NULL,
	`level` integer NOT NULL,
	`max_level` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_buildings_game` ON `buildings` (`game_id`);--> statement-breakpoint
CREATE TABLE `game` (
	`id` text PRIMARY KEY NOT NULL,
	`coins` integer NOT NULL,
	`level` integer NOT NULL,
	`level_number` integer NOT NULL,
	`click_coins` integer NOT NULL,
	`limit_miners` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`mineral_name` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_inventory_game` ON `inventory` (`game_id`);--> statement-breakpoint
CREATE TABLE `mapping` (
	`game_id` text NOT NULL,
	`front_id` text NOT NULL,
	`back_id` text NOT NULL,
	PRIMARY KEY(`game_id`, `front_id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mapping_front_id_unique` ON `mapping` (`front_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `mapping_back_id_unique` ON `mapping` (`back_id`);--> statement-breakpoint
CREATE INDEX `idx_mapping_game` ON `mapping` (`game_id`);--> statement-breakpoint
CREATE TABLE `miners` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`force` integer NOT NULL,
	`level` integer NOT NULL,
	`max_level` integer NOT NULL,
	`cost` integer NOT NULL,
	`cost_improvement` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_miners_game` ON `miners` (`game_id`);--> statement-breakpoint
CREATE TABLE `miners_base` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`type` text NOT NULL,
	`cost` integer NOT NULL,
	`max_level` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_miners_base_game` ON `miners_base` (`game_id`);--> statement-breakpoint
CREATE TABLE `miners_name` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`count` integer NOT NULL,
	`game_id` text NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_miners_name_game` ON `miners_name` (`game_id`);--> statement-breakpoint
CREATE TABLE `pending` (
	`game_id` text NOT NULL,
	`request_id` text NOT NULL,
	`result` text,
	`completed` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	PRIMARY KEY(`game_id`, `request_id`),
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_pending_game` ON `pending` (`game_id`);--> statement-breakpoint
CREATE TABLE `tools` (
	`id` text PRIMARY KEY NOT NULL,
	`miner_id` text,
	`game_id` text NOT NULL,
	`tool_type` text NOT NULL,
	`tool_cost` integer NOT NULL,
	`tool_cost_improvement` integer NOT NULL,
	`tool_level` integer NOT NULL,
	`fortune_level` integer NOT NULL,
	`efficiency_level` integer NOT NULL,
	`max_level` integer NOT NULL,
	`availability` integer NOT NULL,
	`value` integer NOT NULL,
	FOREIGN KEY (`miner_id`) REFERENCES `miners`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_tools_game` ON `tools` (`game_id`);--> statement-breakpoint
CREATE TABLE `tools_base` (
	`id` text PRIMARY KEY NOT NULL,
	`game_id` text NOT NULL,
	`type` text NOT NULL,
	`cost` integer NOT NULL,
	`max_level` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_tools_base_game` ON `tools_base` (`game_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`password` text NOT NULL,
	`game_id` text,
	FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_user_unique` ON `users` (`user`);