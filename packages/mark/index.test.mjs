import { expect, test } from 'vitest'
import { mark, evict } from "."
import {has, add} from "./fake-cdn.mjs"


// Before all create temp dir and then run command to setup db.

test('mark and evict', async () => {
  const paths = [`/a`]
  paths.forEach(path => add(path))
  await mark(`1`, paths)
  const evicted = await evict([`1`])

  expect(paths).toEqual(evicted)
  expect(paths.map(path => has(path))).toEqual([false])
})

test('mark and evict on multiple paths', async () => {
  const paths1 = [`/a`]
  const paths2 = [`/b`]
  const allPaths = [...paths1, ...paths2]
  allPaths.forEach(path => add(path))
  await mark(`1`, paths1)
  await mark(`1`, paths2)
  const evicted = await evict([`1`])

  expect([...paths1, ...paths2]).toEqual(evicted)
  expect(allPaths.map(path => has(path))).toEqual([false, false])
})
