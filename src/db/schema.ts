import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const resumes = sqliteTable('resumes', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  filepath: text('filepath').notNull(),
  status: text('status').notNull(),
  analysis: text('analysis'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const jobDescriptions = sqliteTable('job_descriptions', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  filepath: text('filepath').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});