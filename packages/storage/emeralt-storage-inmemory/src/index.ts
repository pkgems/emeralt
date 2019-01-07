import { IEmeraltStorage } from '@emeralt/types'

export class EmeraltStorageInMemory implements IEmeraltStorage {
  getTarball(name: string): string | void {
    throw new Error('Method not implemented.')
  }
  putTarball(name: string, tarball: string): boolean {
    throw new Error('Method not implemented.')
  }
}
