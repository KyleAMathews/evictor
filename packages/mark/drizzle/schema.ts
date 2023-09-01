import { sqliteTable, AnySQLiteColumn, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const cache = sqliteTable("cache", {
	key: text("key"),
	value: text("value"),
});