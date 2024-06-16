import {
  mysqlTable,
  serial,
  text,
  integer,
  varchar,
  datetime,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});

export const sessions = mysqlTable('session', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: integer('user_id', {
    length: 255,
  })
    .notNull()
    .references(() => users.id),
  expiresAt: datetime('expires_at').notNull(),
});
