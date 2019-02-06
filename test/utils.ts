import ava, { ExecutionContext } from 'ava'
import { resolve } from 'path'

export const test = <T>(
  msg: string,
  cb: (t: ExecutionContext, plugin: T) => any,
) => {
  // @ts-ignore
  const plugin: T = Object.values(
    require(resolve(process.cwd(), 'src/index.ts')),
  )[0]

  return ava(msg, (t) => cb(t, plugin))
}
