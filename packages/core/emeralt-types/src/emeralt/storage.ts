export interface IEmeraltStorage {
  /* get raw data */
  getTarball(name: string, version: string): Promise<string>

  /* get download URL */
  getTarballURL(name: string, version: string): Promise<string>

  putTarball(name: string, version: string, tarball: string): Promise<boolean>

  deleteTarball(name: string, version: string): Promise<boolean>
}
