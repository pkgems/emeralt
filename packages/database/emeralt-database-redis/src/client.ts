import { path, assocPath, init, last, dissoc, remove } from 'ramda'
import Redis from 'ioredis'

export type ClientOptions = {
  host: string
  port: number
  prefix: string
}

// i'm sorry...
export const createClient = ({
  prefix = 'test-',
  ...config
}: ClientOptions) => {
  type Key = [string, ...string[]]
  const redis = new Redis(config)

  const get = async (key: Key) => {
    switch (key.length) {
      case 1:
        return JSON.parse(await redis.get(prefix + key[0]))
      case 2:
        return JSON.parse(await redis.hget(prefix + key[0], key[1]))
      default: {
        const val = (await get([key[0], key[1]])) || {}

        return path(remove(0, 2, key), val)
      }
    }
  }

  const set = async (key: Key, value: any) => {
    switch (key.length) {
      case 1:
        return redis.set(prefix + key[0], JSON.stringify(value))
      case 2:
        return redis.hset(prefix + key[0], key[1], JSON.stringify(value))
      default: {
        let data = (await get([key[0], key[1]])) || {}

        data = assocPath(remove(0, 2, key), value, data)

        return set([key[0], key[1]], data)
      }
    }
  }

  const list = async (key: Key) => {
    switch (key.length) {
      case 1:
        return redis.hkeys(prefix + key[0])
      default:
        return Object.keys((await get(key)) || {})
    }
  }

  const exists = async (key: Key) => {
    switch (key.length) {
      case 1:
        return !!(await redis.exists(prefix + key[0]))
      case 2:
        return !!(await redis.hexists(prefix + key[0], key[1]))
      default:
        return !!(await get(key))
    }
  }

  const del = async (key: Key) => {
    switch (key.length) {
      case 1:
        return !!(await redis.del(prefix + key[0]))
      case 2:
        return !!(await redis.hdel(prefix + key[0], key[1]))
      default: {
        const path = init(key) as Key
        const target = last(key)

        const data = await get(path)

        if (!data || !data[target]) {
          return false
        } else {
          await set(path, dissoc(target, data))

          return true
        }
      }
    }
  }

  return {
    redis,
    get,
    set,
    list,
    exists,
    del,
  }
}
