import { IEmeraltServerHandler } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const ping: IEmeraltServerHandler = () =>
  Router().get(endpoints.ping, (req, res) => {
    res.status(200).json({})
  })
