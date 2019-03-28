import { Router } from 'express'
import { resolve } from 'url'

import { TEmeraltHandlerParams } from '@/types'
import { endpoints } from '@/constants'
import { useIf } from '@/utils'

export const getPackageHandler = ({
  config,
  database,
}: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.package.get,
    Router().get(endpoints.package.get, async (req, res, next) => {
      const { package_name } = req.params

      // retrieve metadata from database
      const metadata = await database.getMetadata(package_name)

      if (!metadata) {
        // package not found - redirect to upstream (optional) (plugin) (dependencies)
        return res.redirect(`http://registry.npmjs.org/${package_name}`)
      }

      // retrieve all package versions
      const versions = await database.getVersions(package_name)

      // determine tarball absolute url
      Object.keys(versions).forEach((version) => {
        versions[version].dist.tarball = resolve(
          config.url,
          `/-/tarball/${encodeURIComponent(
            versions[version].name,
          )}/${encodeURIComponent(versions[version].version)}`,
        )
      })

      res.status(200).json({
        ...metadata,
        versions,
      })
    }),
  )
