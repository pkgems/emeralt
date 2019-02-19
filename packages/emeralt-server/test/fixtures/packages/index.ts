import { join } from 'path'
import { Readable } from 'stream'
import { readFile } from 'fs-extra'
import packlist from 'npm-packlist'
import tar from 'tar'

const getPkgTarball = async (dir) => {
  const files = await packlist({ path: dir })

  const readable = tar.create(
    {
      cwd: dir,
      gzip: true,
    },
    files,
  )

  return new Readable().wrap(readable)
}

const getPkgMetadata = async (dir) =>
  JSON.parse(await readFile(join(dir, 'package.json'), 'utf8'))

export const createPackage = async (name: string) => ({
  metadata: await getPkgMetadata(join(__dirname, name)),
  tarball: await getPkgTarball(join(__dirname, name)),
})
