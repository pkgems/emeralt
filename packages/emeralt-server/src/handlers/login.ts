import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { useIf } from '@/utils'
import { Router } from 'express'

export const login = ({ config }: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.login,
    Router().post(endpoints.login, (req, res) => {
      res.status(401).json({
        error: '',
      })
    }),
  )
