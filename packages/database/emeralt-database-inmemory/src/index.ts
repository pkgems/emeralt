import { IEmeraltDatabase } from '@emeralt/types'

export class EmeraltDatabaseInMemory implements IEmeraltDatabase {
  getPackage(name: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  packageExists(name: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  versionExists(name: string, version: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  getVersion(name: string, version: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  putVersion(name: string, version: string, data: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
