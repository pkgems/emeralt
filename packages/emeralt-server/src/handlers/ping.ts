import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { useIf } from '@/utils'
import { Router } from 'express'

export const ping = ({ config }: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.ping,
    Router().get(endpoints.ping, (req, res) => {
      res.status(200).json({})
    }),
  )
