import { basename } from 'path'

const getIndex = (order: string[], a: string) => {
  const index = order.indexOf(a)

  if (index === -1) return Infinity
  return index
}

export const sortPackagesByBuildOrder = (
  packages: string[],
  buildOrder: string[],
) => {
  const buildOrderBasenames = buildOrder.map((p) => basename(p))

  return packages.sort(
    (a, b) =>
      getIndex(buildOrderBasenames, basename(a)) -
      getIndex(buildOrderBasenames, basename(b)),
  )
}
