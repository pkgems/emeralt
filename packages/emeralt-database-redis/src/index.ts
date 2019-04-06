import {
  IEmeraltDatabase,
  CEmeraltDatabase,
  TMetadata,
  TVersion,
} from '@emeralt/types'
import Redis, { Redis as TRedis, RedisOptions } from 'ioredis'

type Options = {
  // connection options
  redis?: RedisOptions

  // string to prefix paths with
  // allows to create isolated namespaces
  prefix?: string
}

class CEmeraltDatabaseRedis implements CEmeraltDatabase {
  private prefix: string
  private redis: TRedis

  constructor({ redis, prefix = 'emeralt' }: Options) {
    this.prefix = prefix
    this.redis = new Redis(redis)
  }

  public async getMetadatas() {
    const [_, vals]: [number, string[]] = await this.redis.hscan(
      this.prefix,
      0,
      'MATCH',
      '*-metadata',
    )

    return vals.reduce((acc, cur, index) => {
      if (index % 2 === 0) {
        return {
          ...acc,
          [cur.substring(0, cur.length - 9)]: JSON.parse(vals[index + 1]),
        }
      }

      return acc
    }, {})
  }

  public hasMetadata(name: string) {
    return this.redis
      .hexists(this.prefix, `${name}-metadata`)
      .then((r) => Boolean(r))
  }

  public getMetadata(name: string) {
    return this.redis
      .hget(this.prefix, `${name}-metadata`)
      .then((r) => JSON.parse(r))
  }

  public putMetadata(name: string, data: TMetadata) {
    return this.redis.hset(
      this.prefix,
      `${name}-metadata`,
      JSON.stringify(data),
    )
  }

  public async getVersions(name: string) {
    return this.redis
      .hget(this.prefix, `${name}-versions`)
      .then((r) => (r ? JSON.parse(r) : {}))
  }

  public async hasVersion(name: string, version: string) {
    const versions = await this.getVersions(name)

    return Boolean(versions[version])
  }

  public async getVersion(name: string, version: string) {
    const versions = await this.getVersions(name)

    return versions[version]
  }

  public async putVersion(name: string, version: string, data: TVersion) {
    const versions = await this.getVersions(name)

    versions[version] = data

    return this.redis.hset(
      this.prefix,
      `${name}-versions`,
      JSON.stringify(versions),
    )
  }

  public dropData() {
    return this.redis.del(this.prefix)
  }

  public async healthz() {
    try {
      await this.redis.ping()

      return { ok: true }
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        error: error,
      }
    }
  }
}

export const EmeraltDatabaseRedis: IEmeraltDatabase<Options> = (
  options,
) => () => new CEmeraltDatabaseRedis(options)
