import {
  IEmeraltDatabase,
  CEmeraltDatabase,
  TMetadata,
  TVersion,
} from '@emeralt/types'
import {
  Firestore,
  CollectionReference,
  DocumentReference,
} from '@google-cloud/firestore'

type Options = {
  prefix?: {
    collection: string
    document: string
  }
}

class CEmeraltDatabaseCloudFirestore implements CEmeraltDatabase {
  db: {
    metadatas: CollectionReference
    versions: CollectionReference
  }

  constructor(private options: Options) {
    let firestore = new Firestore() as Firestore | DocumentReference

    // prefixify
    if (this.options.prefix) {
      firestore = firestore
        .collection(this.options.prefix.collection)
        .doc(this.options.prefix.document)
    }

    this.db = {
      metadatas: firestore.collection('metadatas'),
      versions: firestore.collection('versions'),
    }
  }

  private reduceCollection = <T>(col: CollectionReference) =>
    col.get().then((collection) =>
      collection.docs.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id]: cur.data() as T,
        }),
        {},
      ),
    )

  public getMetadatas() {
    return this.reduceCollection(this.db.metadatas)
  }

  public hasMetadata(name: string) {
    return this.db.metadatas
      .doc(name)
      .get()
      .then((d) => d.exists)
  }

  public getMetadata(name: string) {
    return this.db.metadatas
      .doc(name)
      .get()
      .then((d) => d.data() as TMetadata)
  }

  public putMetadata(name: string, data: TMetadata) {
    this.db.metadatas.doc(name).set(data, {
      merge: true,
    })
  }

  public getVersions(name: string) {
    return this.reduceCollection(
      this.db.versions.doc(name).collection('versions'),
    )
  }

  public hasVersion(name: string, version: string) {
    return this.db.versions
      .doc(name)
      .collection('versions')
      .doc(version)
      .get()
      .then((d) => d.exists)
  }

  public getVersion(name: string, version: string) {
    return this.db.versions
      .doc(name)
      .collection('versions')
      .doc(version)
      .get()
      .then((d) => d.data() as TVersion)
  }

  public putVersion(name: string, version: string, data: TVersion) {
    return this.db.versions
      .doc(name)
      .collection('versions')
      .doc(version)
      .set(data, {
        merge: true,
      })
  }

  public async dropData() {
    await this.db.metadatas
      .listDocuments()
      .then((metadatas) => Promise.all(metadatas.map((d) => d.delete())))

    await this.db.versions.listDocuments().then((names) =>
      Promise.all(
        names.map(async (d) => {
          await d
            .collection('versions')
            .listDocuments()
            .then((versions) =>
              Promise.all(versions.map((doc) => doc.delete())),
            )

          await d.delete()
        }),
      ),
    )
  }
}

export const EmeraltDatabaseCloudFirestore: IEmeraltDatabase<Options> = (
  options,
) => () => new CEmeraltDatabaseCloudFirestore(options)
