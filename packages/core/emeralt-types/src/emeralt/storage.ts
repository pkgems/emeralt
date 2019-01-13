import { Readable } from 'stream'
import { IEmeraltPlugin } from './plugin'

export interface CEmeraltStorage {
  /* get raw data */
  getTarball(name: string, version: string): Promise<Readable>

  /* put raw data */
  putTarball(name: string, version: string, tarball: Buffer): Promise<any>
}

export interface IEmeraltStorage<C = {}>
  extends IEmeraltPlugin<CEmeraltStorage, C> {}
