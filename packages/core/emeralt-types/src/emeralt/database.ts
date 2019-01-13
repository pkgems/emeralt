import { IEmeraltPlugin } from './plugin'

export interface CEmeraltDatabase {
  listMetadata()
  getMetadata(name: string)
  putMetadata(name: string, data: any)

  listVersions(name: string)
  getVersion(name: string, version: string)
  putVersion(name: string, version: string, data: any)
}

export interface IEmeraltDatabase<C = {}>
  extends IEmeraltPlugin<CEmeraltDatabase, C> {}
