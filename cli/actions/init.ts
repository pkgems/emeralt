import { join } from 'path'
import { copy } from 'fs-extra'
import { execSync } from 'child_process'
import replace from 'replace-in-file'
import { getRootDir } from '../utils'

export const init = async (name: string, template: string = 'package') => {
  const rootDir = getRootDir()
  const templatePath = join(rootDir, 'cli', 'templates', template)
  const packagePath = join(rootDir, 'packages', `emeralt-${name}`)

  console.log('[init] copying templates')
  await copy(templatePath, packagePath)
  await replace({
    files: join(packagePath, '**/*'),
    from: /%{NAME}%/g,
    to: name,
  })

  console.log('[init] installing dependencies')
  execSync('yarn install', {
    cwd: rootDir,
  })

  console.log('[init] done')
}
