import { join, basename } from 'path'
import { copy, pathExists } from 'fs-extra'
import replace from 'replace-in-file'
import chalk from 'chalk'
import { exec } from 'child_process'

const splicePath = (p: string, c: number, delimiter = '/') =>
  p
    .split(delimiter)
    .splice(c)
    .join(delimiter)

const getPackageName = (packagePath: string) =>
  '@emeralt/' + splicePath(basename(packagePath), 1, '-')

const getPackageShortName = (packagePath: string) =>
  splicePath(basename(packagePath), 1, '-')

const panic = (message) => {
  console.error(chalk.red(message))

  return process.exit(1)
}

const info = (message) => {
  console.error(chalk.cyan(message))
}

const init = async (packagePath: string, templatePath: string) => {
  if (await pathExists(packagePath))
    return panic(`Package ${splicePath(packagePath, -2)} already exists!`)

  if (!(await pathExists(templatePath)))
    return panic(`Template ${splicePath(templatePath, -2)} does not exist!`)

  info('Copying template')

  await copy(templatePath, packagePath)

  await replace({
    files: join(packagePath, '**/*'),
    from: /%NAME%/g,
    to: getPackageName(packagePath),
  })

  await replace({
    files: join(packagePath, '**/*'),
    from: /%SHORT_NAME%/g,
    to: getPackageShortName(packagePath),
  })

  info('Installing dependencies')

  await exec('yarn')
}

init(
  join(__dirname, '../packages', process.argv[2]),
  join(__dirname, '../templates', process.argv[3] || 'package'),
)
