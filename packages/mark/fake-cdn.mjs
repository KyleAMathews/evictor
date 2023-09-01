const cdn = new Set()

export function has(path) {
  return cdn.has(path)
}

export function add(path) {
  cdn.add(path)
}

export function purge(path) {
  cdn.delete(path)
}
