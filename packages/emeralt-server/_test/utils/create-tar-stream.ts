import { Readable } from 'stream'
import packlist from 'npm-packlist'
import tar from 'tar'

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
