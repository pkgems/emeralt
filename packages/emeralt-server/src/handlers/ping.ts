import { TEmeraltHandlerParams } from '@emeralt/types'
import { Router } from 'express'

import { endpoints } from '@/constants'
import { useIf } from '@/utils'

export const pingHandler = ({ config }: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.ping,
    Router().get(endpoints.ping, (req, res) => {
      res.status(200).json({})
    }),
  )
