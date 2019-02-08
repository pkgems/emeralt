import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { useIf } from '@/utils'
import { Router } from 'express'

export const getHandler = ({ config, database }: TEmeraltHandlerParams) =>
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

      res.status(200).json({
        ...metadata,
        versions,
      })
    }),
  )
