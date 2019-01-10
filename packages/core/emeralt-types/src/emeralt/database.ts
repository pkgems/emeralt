export interface IEmeraltDatabase {
  listMetadata()
  getMetadata(name: string)
  putMetadata(name: string, data: any)

  listVersions(name: string)
  getVersion(name: string, version: string)
  putVersion(name: string, version: string, data: any)
}
