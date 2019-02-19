import {
  IEmeraltDatabase,
  CEmeraltDatabase,
  TMetadata,
  TVersion,
} from '@emeralt/types'

class CEmeraltDatabaseInMemory implements CEmeraltDatabase {
  private storage: {
    metadata: Record<string, TMetadata>
    versions: Record<string, Record<string, TVersion>>
  }

  constructor() {
    this.storage = {
      metadata: {},
      versions: {},
    }
  }

  public getMetadatas() {
    return { ...this.storage.metadata }
  }

  public hasMetadata(name: string) {
    return Boolean(this.getMetadata(name))
  }

  public getMetadata(name: string) {
    return this.storage.metadata[name]
  }

  public putMetadata(name: string, data: TMetadata) {
    this.storage.metadata[name] = data
  }

  public getVersions(name: string) {
    return this.storage.versions[name] || {}
  }

  public hasVersion(name: string, version: string) {
    return Boolean(this.getVersions(name)[version])
  }

  public getVersion(name: string, version: string) {
    return this.getVersions(name)[version]
  }

  public putVersion(name: string, version: string, data: TVersion) {
    const versions = this.getVersions(name)

    versions[version] = data

    this.storage.versions[name] = versions
  }

  public dropData() {
    this.storage = {
      metadata: {},
      versions: {},
    }
  }
}

export const EmeraltDatabaseInMemory: IEmeraltDatabase = () => () =>
  new CEmeraltDatabaseInMemory()
