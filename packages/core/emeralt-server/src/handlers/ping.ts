import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const ping = (params: TEmeraltHandlerParams) =>
  Router().get(endpoints.ping, (req, res) => {
    res.status(200).json({})
  })
