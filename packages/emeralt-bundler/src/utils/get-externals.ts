import { getPackageJson } from './get-package-json'

export const getExternals = async (
  cwd: string = process.cwd(),
  includeDeps,
) => {
  const {
    dependencies,
    devDependencies,
    peerDependencies,
  } = await getPackageJson(cwd)

  const deps = includeDeps
    ? []
    : Object.keys({
        ...(dependencies || {}),
        ...(devDependencies || {}),
        ...(peerDependencies || {}),
      })

  const builtin =
    require('module').builtinModules ||
    // @ts-ignore
    Object.keys(process.binding('natives'))

  return [...deps, ...builtin]
}
