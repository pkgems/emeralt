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

class CEmeraltDatabaseInMemory implements CEmeraltDatabase {
  redis: TRedis

  constructor(private options: Options) {
    this.redis = new Redis(this.options.redis)
  }

  private parseRecord = (rec: Record<string, string>) => {
    return Object.keys(rec).reduce((acc, key) => {
      return {
        ...acc,
        [key]: JSON.parse(rec[key]),
      }
    }, {})
  }

  private getPath(str: string) {
    return `${this.options.prefix}${str}`
  }

  public getMetadatas() {
    return this.redis.hgetall(this.getPath('packages')).then(this.parseRecord)
  }

  public hasMetadata(name: string) {
    return this.redis
      .hexists(this.getPath('packages'), name)
      .then((r) => Boolean(r))
  }

  public getMetadata(name: string) {
    return this.redis
      .hget(this.getPath('packages'), name)
      .then((r) => JSON.parse(r))
  }

  public putMetadata(name: string, data: TMetadata) {
    return this.redis.hset(this.getPath('packages'), name, JSON.stringify(data))
  }

  public getVersions(name: string) {
    return this.redis
      .hgetall(this.getPath(`versions-${name}`))
      .then(this.parseRecord)
  }

  public hasVersion(name: string, version: string) {
    return this.redis
      .hexists(this.getPath(`versions-${name}`), version)
      .then((r) => Boolean(r))
  }

  public getVersion(name: string, version: string) {
    return this.redis
      .hget(this.getPath(`versions-${name}`), version)
      .then((r) => JSON.parse(r))
  }

  public putVersion(name: string, version: string, data: TVersion) {
    return void this.redis.hset(
      this.getPath(`versions-${name}`),
      version,
      JSON.stringify(data),
    )
  }

  public dropData() {
    return this.redis.flushdb()
  }
}

export const EmeraltDatabaseInMemory: IEmeraltDatabase<Options> = (
  options,
) => () => new CEmeraltDatabaseInMemory(options)
