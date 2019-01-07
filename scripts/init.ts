import { join, basename } from 'path'
import { copy, pathExists } from 'fs-extra'
import replace from 'replace-in-file'
import chalk from 'chalk'

const splicePath = (p: string, c: number, delimiter = '/') =>
  p
    .split(delimiter)
    .splice(c)
    .join(delimiter)

const getPackageName = (packagePath: string) =>
  '@emeralt/' + splicePath(basename(packagePath), 1, '-')

const panic = (message) => {
  console.error(chalk.red(message))

  return process.exit(1)
}

const init = async (packagePath: string, templatePath: string) => {
  if (await pathExists(packagePath))
    return panic(`Package ${splicePath(packagePath, -2)} already exists!`)

  if (!(await pathExists(templatePath)))
    return panic(`Template ${splicePath(templatePath, -2)} does not exist!`)

  await copy(templatePath, packagePath)
  await replace({
    files: join(packagePath, '**/*'),
    from: /%NAME%/g,
    to: getPackageName(packagePath),
  })
}

init(
  join(__dirname, '../packages', process.argv[2]),
  join(__dirname, '../templates', process.argv[3] || 'package'),
)
