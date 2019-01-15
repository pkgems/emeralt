import { createTarStream, readPackageJson } from './index'
import { mergeDeepRight } from 'ramda'

export const publishPackage = async (
  client: any,
  address: string,
  pkgDir: string,
  merge = {},
) =>
  client.publish(
    address,
    mergeDeepRight(
      {
        ...client.config,
        access: 'public',
        body: await createTarStream(pkgDir),
        metadata: await readPackageJson(pkgDir),
      },
      merge,
    ),
  )
