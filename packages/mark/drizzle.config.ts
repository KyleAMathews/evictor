import type { Config } from "drizzle-kit";
 
export default {
  schema: "./schema/index.ts",
  driver: 'better-sqlite',
  out: `./drizzle`,
  dbCredentials: {
    url: 'sqlite.db',
  }
} satisfies Config;
