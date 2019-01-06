import { IEmeraltServerHandler } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const getPackage: IEmeraltServerHandler = () =>
  Router().get(endpoints.package.get, (req, res, next) => {
    res.status(200).json({})
  })
