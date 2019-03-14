import {
  CEmeraltDatabase,
  IEmeraltDatabase,
  TVersion,
  TMetadata,
} from '@emeralt/types'
import { MongoClient, Db, Collection, IndexOptions } from 'mongodb'
import deepmerge from 'deepmerge'

type Options = {
  // mongodb connection URI
  uri?: string

  // indexing configuration
  // by default, indexing is enabled (indexing property is undefined)
  // but it can be disabled explicitly by setting indexing to false
  indexing?:
    | {
        metadatas: boolean
        versions: boolean
        options?: IndexOptions
      }
    | false
}

export const defaultOptions: Options = {
  uri: 'mongodb://localhost:27017/emeralt-test',
  indexing: {
    metadatas: true,
    versions: true,
    options: {
      background: true,
    },
  },
}

class CEmeraltDatabaseMongoDB implements CEmeraltDatabase {
  storage: {
    metadatas: Collection
    versions: Collection
  }

  constructor(private db: Db) {
    this.storage = {
      metadatas: this.db.collection('metadatas'),
      versions: this.db.collection('versions'),
    }
  }

  public getMetadatas() {
    return this.storage.metadatas
      .find({}, { projection: { _id: false } })
      .toArray()
      .then((metadatas) =>
        metadatas.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.name]: curr,
          }),
          {},
        ),
      )
  }

  public hasMetadata(name: string) {
    return this.storage.metadatas
      .find({ name })
      .limit(1)
      .count()
      .then((c) => c === 1)
  }

  public getMetadata(name: string) {
    return this.storage.metadatas.findOne(
      { name },
      { projection: { _id: false } },
    )
  }

  public putMetadata(name: string, data: TMetadata) {
    return this.storage.metadatas.findOneAndUpdate(
      { name },
      { $set: { ...data } },
      { upsert: true },
    )
  }

  public getVersions(name: string) {
    return this.storage.versions.findOne({ name }).then((v) =>
      Object.keys(v ? v.versions : {}).reduce(
        (acc, key) => ({
          ...acc,
          ...{ [key.replace(/-/g, '.')]: v.versions[key] },
        }),
        {},
      ),
    )
  }

  public hasVersion(name: string, version: string) {
    return this.getVersion(name, version).then((v) => Boolean(v))
  }

  public getVersion(name: string, version: string) {
    return this.getVersions(name).then((versions) => versions[version])
  }

  public putVersion(name: string, version: string, data: TVersion) {
    return this.storage.versions.findOneAndUpdate(
      { name },
      { $set: { versions: { [version.replace(/\./g, '-')]: { ...data } } } },
      { upsert: true },
    )
  }

  public dropData() {
    return this.db.dropDatabase()
  }

  public async healthz() {
    try {
      await this.db.command({ ping: 1 })

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

export const EmeraltDatabaseMongoDB: IEmeraltDatabase<Options> = (
  userOptions,
) => async () => {
  const { uri, indexing } = deepmerge(defaultOptions, userOptions || {})

  const client = await new MongoClient(uri, { useNewUrlParser: true }).connect()
  const db = client.db()

  await db.createCollection('metadatas')
  await db.createCollection('versions')

  if (indexing) {
    // use indexing for metadatas, true by default
    if (indexing.metadatas)
      await db
        .collection('metadatas')
        .createIndex({ name: 1 }, indexing.options)

    // use indexing for versions, true by default
    if (indexing.versions)
      await db.collection('versions').createIndex({ name: 1 }, indexing.options)
  }

  return new CEmeraltDatabaseMongoDB(db)
}
