import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const getHandler = ({ database }: TEmeraltHandlerParams) =>
  Router().get(endpoints.package.get, async (req, res, next) => {
    const { package_name } = req.params

    const metadata = await database.getKey(['metadata', package_name])

    if (!metadata) {
      // package not found - redirect to upstream (optional) (plugin) (dependencies)
      return res.redirect(`http://registry.npmjs.org/${package_name}`)
    }

    const versions = await database.listKeys(['versions', package_name])

    res.status(200).json({
      ...metadata,
      versions,
    })
  })
