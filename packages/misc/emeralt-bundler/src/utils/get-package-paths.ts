import { join } from 'path'

export const getPackagePaths = (cwd = process.cwd()) => ({
  root: cwd,
  input: join(cwd, 'src', 'index.ts'),
  output: {
    dir: join(cwd, 'build'),
    code: join(cwd, 'build', 'index.js'),
    map: join(cwd, 'build', 'index.js.map'),
    definitions: join(cwd, 'build', 'index.d.ts'),
    coverage: join(cwd, '.nyc_output'),
  },
  cache: {
    root: join(cwd, 'node_modules/.cache'),
    ncc: join(cwd, 'node_modules/.cache/ncc'),
  },
  node_modules: join(cwd, 'node_modules'),
})
