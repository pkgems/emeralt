import { resolve } from 'path'
import { execSync } from 'child_process'
import microbundle from 'microbundle'
import chalk from 'chalk'
import { remove } from 'fs-extra'
import { getExternals } from '../utils'

export const build = async ({
  cwd = process.cwd(),
  minify = false,
  sourceMap = true,
  includeDependencies = false,
} = {}) => {
  cwd = resolve(process.cwd(), cwd)
  process.chdir(cwd)

  await remove(resolve(cwd, 'build'))

  try {
    execSync('tsc --noEmit')
  } catch (error) {
    console.warn(chalk.yellow(error.stdout))
  }

  const stats = await microbundle({
    entry: resolve(cwd, 'src/index.ts'),
    output: resolve(cwd, 'build', 'index.js'),
    format: 'es,cjs',
    strict: true,
    compress: minify,
    sourcemap: sourceMap,
    target: 'node',
    external: (await getExternals(cwd, includeDependencies)).join(','),
    cwd: cwd,
    // watch: true,
  })

  console.log(stats)
}
