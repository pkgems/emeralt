// import { TVersion, TPackage } from '../npm'

export interface IEmeraltDatabase {
  // listPackages(): Promise<TPackage[]>
  // listVersions(name: string): Promise<TVersion[]>

  // getPackage(name: string): Promise<TPackage>
  // putPackage(name: string, data: TPackage): Promise<boolean>

  // getVersion(name: string, version: string): Promise<TVersion>
  // putVersion(name: string, version: string, data: TVersion): Promise<boolean>

  // packageExists(name: string): Promise<boolean>
  // versionExists(name: string, version: string): Promise<boolean>

  getMetadata(name: string)
  putMetadata(name: string, data: any)

  getVersion(name: string, version: string)
  putVersion(name: string, version: string, data: any)
}
