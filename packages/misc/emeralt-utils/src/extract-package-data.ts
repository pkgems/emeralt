import { TPackage } from '@emeralt/types'

/* remove version and attachments from package */
const extractMetadata = (pkg: TPackage) => {
  const copy = { ...pkg }

  delete copy.version
  delete copy._attachments

  return copy
}

/* remove first of versions array with modified tarball url */
const extractVersion = (pkg: TPackage) => {
  const version = Object.values(pkg.versions).shift()

  const encodedName = encodeURIComponent(version.name)
  const encodedVersion = encodeURIComponent(version.version)

  // TODO: get address from config
  version.dist.tarball = `http://localhost:8080/-/tarball/${encodedName}/${encodedVersion}`

  return version
}

const extractTarball = (pkg: TPackage) => {
  const tarball = Object.values(pkg._attachments)[0]

  tarball.data =
    typeof tarball.data === 'string'
      ? Buffer.from(tarball.data, 'base64')
      : tarball.data

  return tarball
}

export const extractPackageData = (pkg: TPackage) => ({
  metadata: extractMetadata(pkg),
  version: extractVersion(pkg),
  tarball: extractTarball(pkg),
})
