import { Readable } from 'stream'
import packlist from 'npm-packlist'
import tar from 'tar'
import { join } from 'path'
import { readFile } from 'fs-extra'

export const createTarStream = async (pkgDir: string) => {
  const files = await packlist({ path: pkgDir })

  const readable = tar.create(
    {
      cwd: pkgDir,
      gzip: true,
    },
    files,
  )

  return new Readable().wrap(readable)
}

export const readPackageJson = async (pkgDir) =>
  JSON.parse(await readFile(join(pkgDir, 'package.json'), 'utf8'))
