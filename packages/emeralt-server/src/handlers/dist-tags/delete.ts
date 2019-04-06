import { Router } from 'express'

import { TEmeraltHandlerParams } from '@/types'
import { endpoints } from '@/constants'
import { useIf } from '@/utils'

export const deleteDistTagHandler = ({
  config,
  middlewares,
  database,
}: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.distTags.delete,
    Router().delete(
      endpoints.distTags.delete,
      middlewares.verifyToken,
      async (req, res) => {
        const { package_name, dist_tag } = req.params

        const metadata = await database.getMetadata(package_name)

        if (!metadata) {
          return res.status(404).json({ ok: false })
        }

        delete metadata['dist-tags'][dist_tag]

        await database.putMetadata(package_name, metadata)

        return res.status(200).json({ ok: true })
      },
    ),
  )
