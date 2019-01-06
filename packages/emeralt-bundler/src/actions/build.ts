import { resolve } from 'path'
import { getPackagePaths, getExternals } from '../utils'
import microbundle from 'microbundle'

export const build = async ({
  cwd = process.cwd(),
  minify = false,
  sourceMap = true,
  includeDependencies = false,
} = {}) => {
  cwd = resolve(process.cwd(), cwd)

  process.chdir(cwd)
  const { input, output, cache } = getPackagePaths(cwd)
  const externals = [
    ...[includeDependencies ? [] : await getExternals(cwd)],
    ...[
      require('module').builtinModules ||
        // @ts-ignore
        Object.keys(process.binding('natives')),
    ],
  ]

  const stats = await microbundle({
    entry: resolve(cwd, 'src/index.ts'),
    output: resolve(cwd, 'build'),
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
