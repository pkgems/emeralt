export type TDist = {
  // integrity of files
  integrity: string

  // url of  tarball
  tarball: string

  // shasum of tarball files
  shasum: string

  // ??
  'npm-signature': string

  // count if files in tarball
  fileCount: number

  // tarball unpackaed size
  unpackedSize: number
}
