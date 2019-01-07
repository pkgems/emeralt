import { IEmeraltStorage } from '@emeralt/types'

export class EmeraltStorageInMemory implements IEmeraltStorage {
  private storage = new Map<string, Map<string, string>>()

  private set(name, version, data) {
    if (!this.storage.get(name)) this.storage.set(name, new Map())
    this.storage.get(name).set(version, data)

    return true
  }

  private get(name, version) {
    if (!this.storage.get(name)) return false
    return !this.storage.get(name).get(version) || false
  }

  async getTarball(name: string, version: string): Promise<string | void> {
    throw new Error('Method not implemented.')
  }

  async getTarballURL(name: string, version: string): Promise<string | void> {
    throw new Error('Method not implemented.')
  }

  async putTarball(
    name: string,
    version: string,
    tarball: string,
  ): Promise<boolean> {
    return this.set(name, version, tarball)
  }

  async deleteTarball(name: string, version: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
