import { TVersion } from '../npm'

export interface IEmeraltDatabase {
  getPackage(name: string): Promise<any>

  packageExists(name: string): Promise<boolean>
  versionExists(name: string, version: string): Promise<boolean>

  getVersion(name: string, version: string): Promise<TVersion | null>
  putVersion(name: string, version: string, data: TVersion): Promise<boolean>
}
