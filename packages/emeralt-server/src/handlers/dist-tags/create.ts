import { TEmeraltHandlerParams } from '@/types'

import { Router } from 'express'

import { endpoints } from '@/constants'
import { useIf } from '@/utils'

export const createDistTagHandler = ({
  config,
  middlewares,
  database,
}: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.distTags.create,
    Router().put(
      endpoints.distTags.create,
      middlewares.verifyToken,
      middlewares.text,
      async (req, res) => {
        const { package_name, dist_tag } = req.params

        const metadata = await database.getMetadata(package_name)

        if (!metadata) {
          return res.status(400).json({ ok: false })
        }

        if (!metadata['dist-tags']) {
          metadata['dist-tags'] = {}
        }

        metadata['dist-tags'][dist_tag] = req.body

        await database.putMetadata(package_name, metadata)

        return res.status(200).json({ ok: true })
      },
    ),
  )
