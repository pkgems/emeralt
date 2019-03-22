import { TMetadata } from '@emeralt/types'

/* remove version and attachments from package */
const extractMetadata = (pkg: TMetadata) => {
  const copy = { ...pkg }

  delete copy.version
  delete copy._attachments

  return copy
}

/* remove first of versions array with modified tarball url */
const extractVersion = (pkg: TMetadata) => {
  const version = Object.values(pkg.versions)[0]

  return version
}

const extractTarball = (pkg: TMetadata) => {
  const tarball = Object.values(pkg._attachments)[0]

  tarball.data =
    typeof tarball.data === 'string'
      ? Buffer.from(tarball.data, 'base64')
      : tarball.data

  return tarball
}

export const extractPackageData = (pkg: TMetadata) => ({
  metadata: extractMetadata(pkg),
  version: extractVersion(pkg),
  tarball: extractTarball(pkg),
})
