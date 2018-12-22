import { pathExists, readFile } from 'fs-extra'
import { join } from 'path'

export const getGitignore = async (cwd = process.cwd()) => {
  const gitignorePath = join(cwd, '.gitignore')

  if (await pathExists(gitignorePath)) {
    const raw = await readFile(gitignorePath, 'utf8')

    return raw.split('\n')
  } else {
    return []
  }
}
