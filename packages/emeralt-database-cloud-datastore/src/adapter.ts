import { Datastore, DatastoreOptions } from '@google-cloud/datastore'

type Key = [string, string] | [string, string, string, string]
type ListKey = [string] | [string, string, string]

export class DatastoreAdapter {
  private datastore: Datastore

  constructor(options?: DatastoreOptions) {
    this.datastore = new Datastore(options)
  }

  private serialize(value: any) {
    return { value: Buffer.from(JSON.stringify(value)) }
  }

  private deserialize(record: any) {
    if (!record || !record.value) return null

    return JSON.parse(record.value.toString())
  }

  private key(path: string[]) {
    return this.datastore.key(path.map(encodeURIComponent))
  }

  set(key: Key, value: any) {
    return this.datastore.save({
      key: this.key(key),
      data: this.serialize(value),
    })
  }

  get(key: Key): Promise<any> {
    return this.datastore.get(this.key(key)).then((d) => this.deserialize(d[0]))
  }

  async list(key: ListKey) {
    let query = this.datastore.createQuery(key[key.length - 1])

    if (key.length === 3) {
      query = query.filter('__key__', '>', this.key(key.slice(0, -1)))
    }

    const [data] = await query.run()

    return data.map(this.deserialize)
  }

  async exists(key: Key) {
    const [docs] = await this.datastore
      .createQuery(key[key.length - 2])
      .filter('__key__', this.key(key))
      .select('__key__')
      .limit(1)
      .run()

    return Boolean(docs.length)
  }

  async dropAll([key]: [string]) {
    const [docs] = await this.datastore.createQuery(key).run()

    for (const doc of docs) {
      await this.datastore.delete(doc[this.datastore.KEY])
    }
  }
}
