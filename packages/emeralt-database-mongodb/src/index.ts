import {
  CEmeraltDatabase,
  IEmeraltDatabase,
  TVersion,
  TMetadata,
} from '@emeralt/types'
import { MongoClient, Db, Collection } from 'mongodb'

type Options = {
  url: string
  dbName: string
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
    return this.getMetadata(name).then((metadata) => Boolean(metadata))
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
  options,
) => async () => {
  const { url = 'mongodb://localhost:27017', dbName = 'emeralt-test' } = options

  const client = await new MongoClient(url, { useNewUrlParser: true }).connect()
  const db = client.db(dbName)

  return new CEmeraltDatabaseMongoDB(db)
}
