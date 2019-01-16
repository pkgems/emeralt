import { path, assocPath, init, last, dissoc } from 'ramda'
import Redis, { RedisOptions } from 'ioredis'

export type ClientOptions = RedisOptions

// i'm sorry...
export const createClient = (config: RedisOptions) => {
  type Key = [string, ...string[]]
  const redis = new Redis(config)

  const get = async (key: Key) => {
    switch (key.length) {
      case 1:
        return JSON.parse(await redis.get(key[0]))
      case 2:
        return JSON.parse(await redis.hget(key[0], key[1]))
      default: {
        const val = (await get([key[0], key[1]])) || {}

        return path(key.splice(2), val)
      }
    }
  }

  const set = async (key: Key, value: any) => {
    switch (key.length) {
      case 1:
        return redis.set(key[0], JSON.stringify(value))
      case 2:
        return await redis.hset(key[0], key[1], JSON.stringify(value))
      default: {
        let data = (await get([key[0], key[1]])) || {}

        data = assocPath(key.splice(2), value, data)

        return set([key[0], key[1]], data)
      }
    }
  }

  const list = async (key: Key) => {
    switch (key.length) {
      case 1:
        return redis.hkeys(key[0])
      default:
        return Object.keys(await get(key))
    }
  }

  const exists = async (key: Key) => {
    switch (key.length) {
      case 1:
        return !!(await redis.exists(key[0]))
      case 2:
        return !!(await redis.hexists(key[0], key[1]))
      default:
        return !!(await get(key))
    }
  }

  const del = async (key: Key) => {
    switch (key.length) {
      case 1:
        return redis.del(key[0])
      case 2:
        return !!(await redis.hdel(key[0], key[1]))
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
