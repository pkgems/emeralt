export interface IEmeraltDatabase {
  getPackage(name: string): Promise<any>

  packageExists(name: string): Promise<boolean>
  versionExists(name: string, version: string): Promise<boolean>

  getVersion(name: string, version: string): Promise<any>
  putVersion(name: string, version: string, data: string): Promise<any>
}
