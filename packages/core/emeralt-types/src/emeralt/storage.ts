export interface IEmeraltStorage {
  /* get raw data */
  getTarball(name: string, version: string)

  putTarball(name: string, version: string, tarball: string)
}
