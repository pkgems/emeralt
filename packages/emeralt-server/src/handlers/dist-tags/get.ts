import { Router } from 'express'

import { TEmeraltHandlerParams } from '@/types'
import { endpoints } from '@/constants'
import { useIf } from '@/utils'

export const getDistTagsHandler = ({
  config,
  middlewares,
  database,
}: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.distTags.get,
    Router().get(endpoints.distTags.get, async (req, res) => {
      const metadata = await database.getMetadata(req.params.package_name)

      if (metadata) {
        return res.status(200).json(metadata['dist-tags'])
      } else {
        return res.status(404).json({ ok: false })
      }
    }),
  )
