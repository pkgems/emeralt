import { join } from 'path'
import { copy } from 'fs-extra'
import { execSync } from 'child_process'
import replace from 'replace-in-file'

export const init = async (name: string, template: string = 'package') => {
  const rootPath = join(__dirname, '../../')
  const templatePath = join(__dirname, '../', 'templates', template)
  const packagePath = join(__dirname, '../../', 'packages', `emeralt-${name}`)

  console.log('[init] copying templates')
  await copy(templatePath, packagePath)
  await replace({
    files: join(packagePath, '**/*'),
    from: /%{NAME}%/g,
    to: name,
  })

  console.log('[init] installing dependencies')
  execSync('yarn install', {
    cwd: rootPath,
  })

  console.log('[init] done')
}
