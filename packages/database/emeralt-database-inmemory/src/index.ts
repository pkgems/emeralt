import { IEmeraltDatabase, TVersion } from '@emeralt/types'

export class EmeraltDatabaseInMemory implements IEmeraltDatabase {
  private storage = new Map<string, Map<string, TVersion>>()

  private set(name, version, data) {
    if (!this.storage.get(name)) this.storage.set(name, new Map())
    this.storage.get(name).set(version, data)

    return true
  }

  private get(name, version) {
    if (!this.storage.get(name)) return null
    return this.storage.get(name).get(version)
  }

  getPackage(name: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  packageExists(name: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  versionExists(name: string, version: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async getVersion(name: string, version: string): Promise<TVersion | null> {
    return this.get(name, version)
  }

  async putVersion(
    name: string,
    version: string,
    data: TVersion,
  ): Promise<any> {
    return this.set(name, version, data)
  }
}
