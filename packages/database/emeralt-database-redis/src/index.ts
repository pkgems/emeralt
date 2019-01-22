import { IEmeraltDatabase } from '@emeralt/types'
import { createClient, ClientOptions } from './client'
import { mergeDeepRight } from 'ramda'

export const EmeraltDatabaseRedis: IEmeraltDatabase<ClientOptions> = (
  config: ClientOptions = {
    host: 'localhost',
    port: 6379,
    prefix: 'test-',
  },
) => {
  const client = createClient(config)

  return async () => {
    return {
      getKey: (k) => client.get(k),

      hasKey: (k) => client.exists(k),

      listKeys: (k) => client.list(k),

      setKey: async (k, v) => ((await client.set(k, v)) ? true : true),

      createKey: async (k, v) =>
        (await client.get(k)) // check if exists
          ? false // false if yes
          : (await client.set(k, v)) || true,

      updateKey: async (k, v) => {
        const value = await client.get(k)

        if (!value) {
          return false
        }

        return (await client.set(k, mergeDeepRight(value, v))) || true
      },

      deleteKey: (k) => client.del(k),

      dropDatabase: () => client.redis.flushdb(),
    }
  }
}
