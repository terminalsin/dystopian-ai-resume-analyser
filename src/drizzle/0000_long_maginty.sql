CREATE TABLE `job_descriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`filename` text NOT NULL,
	`filepath` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `resumes` (
	`id` text PRIMARY KEY NOT NULL,
	`filename` text NOT NULL,
	`filepath` text NOT NULL,
	`status` text NOT NULL,
	`analysis` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
