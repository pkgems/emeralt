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

  private parseHscan = (scan: string[], substr: number) =>
    scan.reduce((acc, cur, index) => {
      if (index % 2 === 0) {
        return {
          ...acc,
          [cur.substring(substr)]: JSON.parse(scan[index + 1]),
        }
      }

      return acc
    }, {})

  public async getMetadatas() {
    const [_, vals]: [number, string[]] = await this.redis.hscan(
      this.prefix,
      0,
      'MATCH',
      'metadata-*',
    )

    return this.parseHscan(vals, 9)
  }

  public hasMetadata(name: string) {
    return this.redis
      .hexists(this.prefix, `metadata-${name}`)
      .then((r) => Boolean(r))
  }

  public getMetadata(name: string) {
    return this.redis
      .hget(this.prefix, `metadata-${name}`)
      .then((r) => JSON.parse(r))
  }

  public putMetadata(name: string, data: TMetadata) {
    return this.redis.hset(
      this.prefix,
      `metadata-${name}`,
      JSON.stringify(data),
    )
  }

  public async getVersions(name: string) {
    const [_, vals] = await this.redis.hscan(
      this.prefix,
      0,
      'MATCH',
      'version-*',
    )

    return this.parseHscan(vals, name.length + 9)
  }

  public hasVersion(name: string, version: string) {
    return this.redis
      .hexists(this.prefix, `version-${name}-${version}`)
      .then((r) => Boolean(r))
  }

  public getVersion(name: string, version: string) {
    return this.redis
      .hget(this.prefix, `version-${name}-${version}`)
      .then((r) => JSON.parse(r))
  }

  public putVersion(name: string, version: string, data: TVersion) {
    return void this.redis.hset(
      this.prefix,
      `version-${name}-${version}`,
      JSON.stringify(data),
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
