import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { and, asc, desc, eq, or } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import {cache} from "./drizzle/schema"
import {purge} from "./fake-cdn.mjs"

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

function testEventParser (event) {
  return event
}

function testCDNEvict(paths) {
  paths.forEach(path => purge(path))
}

export async function mark (key, values) {
  db.insert(cache).values(values.map(value => {
    return {
      key,
      value,
    }
  })).run()
}

function matches(key) {
  return db.select({value: cache.value}).from(cache).where(eq(cache.key, key)).all().map(obj => obj.value)
}

function parseEvent(event) {
  return testEventParser(event)
}
export async function evict(event) {
  const keys = parseEvent(event)
  let values = keys.map(key => matches(key))
  const flatValues = values.flat(Infinity)
  // Call eviction plugin with values
  testCDNEvict(flatValues)
  keys.forEach(key =>{
    db.delete(cache).where(eq(cache.key, key)).run()
  })
  return flatValues
}

// Function to mark dependency (puts it in map)
// function to get matching dependencies
// rest can go in tests
