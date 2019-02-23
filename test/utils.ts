import ava, { ExecutionContext } from 'ava'
import { resolve } from 'path'

export const test = <T>(
  msg: string,
  cb: (t: ExecutionContext, createPlugin: T) => any,
) => {
  // @ts-ignore
  const createPlugin: T = Object.values(
    require(resolve(process.cwd(), 'src/index.ts')),
  )[0]

  return ava.serial(msg, async (t) => {
    try {
      await cb(t, createPlugin)
    } catch (error) {
      throw error
    } finally {
      // cleanup
      // @ts-ignore
      const plugin = await createPlugin({})({})
      await plugin.dropData()
    }
  })
}
