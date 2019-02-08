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

  getMetadatas() {
    return { ...this.storage.metadata }
  }

  hasMetadata(name: string) {
    return Boolean(this.getMetadata(name))
  }

  getMetadata(name: string) {
    return this.storage.metadata[name]
  }

  putMetadata(name: string, data: TMetadata) {
    this.storage.metadata[name] = data
  }

  getVersions(name: string) {
    return this.storage.versions[name] || {}
  }

  hasVersion(name: string, version: string) {
    return Boolean(this.getVersions(name)[version])
  }

  getVersion(name: string, version: string) {
    return this.getVersions(name)[version]
  }

  putVersion(name: string, version: string, data: TVersion) {
    const versions = this.getVersions(name)

    versions[version] = data

    this.storage.versions[name] = versions
  }
}

export const EmeraltDatabaseInMemory: IEmeraltDatabase = () => () =>
  new CEmeraltDatabaseInMemory()
