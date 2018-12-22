import { join } from 'path'

export const getPaths = (cwd = process.cwd()) => ({
  root: cwd,
  input: join(cwd, 'src', 'index.ts'),
  output: {
    dir: join(cwd, 'build'),
    code: join(cwd, 'build', 'index.js'),
    map: join(cwd, 'build', 'index.js.map'),
  },
  cache: join(cwd, '.cache/ncc'),
})
