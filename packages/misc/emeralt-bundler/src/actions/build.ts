import { resolve } from 'path'
import { execSync } from 'child_process'
import microbundle from 'microbundle'
import chalk from 'chalk'
import { getPackageJson } from '../utils'
import { remove } from 'fs-extra'

export const build = async ({
  cwd = process.cwd(),
  minify = false,
  sourceMap = true,
  includeDependencies = false,
} = {}) => {
  cwd = resolve(process.cwd(), cwd)
  process.chdir(cwd)

  await remove(resolve(cwd, 'build'))

  const {
    dependencies,
    devDependencies,
    peerDependencies,
  } = await getPackageJson(cwd)

  const modules = Object.keys({
    ...(dependencies || {}),
    ...(devDependencies || {}),
    ...(peerDependencies || {}),
  })

  const externals = [
    ...[includeDependencies ? [] : modules],
    ...[
      require('module').builtinModules ||
        // @ts-ignore
        Object.keys(process.binding('natives')),
    ],
  ]

  try {
    execSync('tsc --noEmit')
  } catch (error) {
    console.error(chalk.red(error.stdout))
    return process.exit(1)
  }

  const stats = await microbundle({
    entry: resolve(cwd, 'src/index.ts'),
    output: resolve(cwd, 'build', 'index.js'),
    format: 'es,cjs',
    strict: true,
    compress: minify,
    sourcemap: sourceMap,
    target: 'node',
    external: externals.join(','),
    cwd: cwd,
  })

  console.log(stats)
}
