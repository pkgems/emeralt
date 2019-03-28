import { Router } from 'express'

import { TEmeraltHandlerParams } from '@/types'
import { endpoints } from '@/constants'
import { useIf } from '@/utils'

export const pingHandler = ({ config }: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.ping,
    Router().get(endpoints.ping, (req, res) => {
      res.status(200).json({})
    }),
  )
