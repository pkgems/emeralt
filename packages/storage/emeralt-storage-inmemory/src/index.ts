import { IEmeraltStorage } from '@emeralt/types'

export class EmeraltStorageInMemory implements IEmeraltStorage {
  getTarball(name: string, version: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  getTarballURL(name: string, version: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  putTarball(name: string, version: string, tarball: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  deleteTarball(name: string, version: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
