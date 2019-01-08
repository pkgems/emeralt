import { Readable } from 'stream'

export interface IEmeraltStorage {
  /* get raw data */
  getTarball(name: string, version: string): Promise<Readable>

  putTarball(name: string, version: string, tarball: Buffer)
}
