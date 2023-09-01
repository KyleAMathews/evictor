import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const cache = sqliteTable('cache', {
  key: text(`key`),
  value: text('value'),
})
