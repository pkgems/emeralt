export interface IEmeraltStorage {
  getTarball(name: string): void | string
  putTarball(name: string, tarball: string): boolean
}
