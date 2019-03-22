import {
  IEmeraltDatabase,
  CEmeraltDatabase,
  TMetadata,
  TVersion,
} from '@emeralt/types'
import fs from 'fs-extra'
import { join } from 'path'

interface Options {
  path?: string
}

const defaultOptions: Options = {
  path: 'node_modules/.data',
}

/**
 * read all files in directory
 * and return an object
 * where key is file name
 * and value is file content parsed as json
 */
const readReduce = (dir: string) =>
  fs.readdir(dir).then((dirs) =>
    dirs.reduce(
      async (acc, cur) => ({
        ...(await acc),
        [decodeURIComponent(cur)]: JSON.parse(
          await fs.readFile(join(dir, cur), 'utf8'),
        ),
      }),
      Promise.resolve({}),
    ),
  )

class CEmeraltDatabaseLocalFS implements CEmeraltDatabase {
  private paths: {
    metadatas: string
    versions: string
  }

  constructor(private options: Options) {
    this.paths = {
      metadatas: join(options.path, 'metadatas'),
      versions: join(options.path, 'versions'),
    }
  }

  private ml(name?: string) {
    return join(this.paths.metadatas, name ? encodeURIComponent(name) : '')
  }

  private vl(...names: string[]) {
    return join(this.paths.versions, ...names.map(encodeURIComponent))
  }

  public getMetadatas() {
    return readReduce(this.ml())
  }

  public hasMetadata(name: string) {
    return fs.pathExists(this.ml(name))
  }

  public async getMetadata(name: string) {
    return (await fs.pathExists(this.ml(name)))
      ? await fs.readFile(this.ml(name)).then((s) => JSON.parse(s.toString()))
      : null
  }

  public putMetadata(name: string, data: TMetadata) {
    return fs.writeFile(this.ml(name), JSON.stringify(data))
  }

  public async getVersions(name: string) {
    return (await fs.pathExists(this.vl(name)))
      ? await readReduce(this.vl(name))
      : {}
  }

  public async hasVersion(name: string, version: string) {
    return await fs.pathExists(this.vl(name, version))
  }

  public async getVersion(name: string, version: string) {
    if (!(await this.hasVersion(name, version))) return null

    return fs
      .readFile(this.vl(name, version))
      .then((s) => JSON.parse(s.toString()))
  }

  public async putVersion(name: string, version: string, data: TVersion) {
    await fs.ensureDir(this.vl(name))

    return fs.writeFile(this.vl(name, version), JSON.stringify(data))
  }

  public dropData() {
    return fs.remove(this.options.path)
  }

  public healthz() {
    return { ok: true }
  }
}

export const EmeraltDatabaseLocalFS: IEmeraltDatabase<Options> = (
  userOptions,
) => async () => {
  const options = Object.assign({}, defaultOptions, userOptions)

  await fs.ensureDir(join(options.path))
  await fs.ensureDir(join(options.path, 'metadatas'))
  await fs.ensureDir(join(options.path, 'versions'))

  return new CEmeraltDatabaseLocalFS(options)
}
