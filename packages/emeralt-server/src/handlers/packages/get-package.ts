import { IEmeraltServerHandler } from '@emeralt/types'
import { Router } from 'express'

export const getPackage: IEmeraltServerHandler = () =>
  Router().get('/:package_name', (req, res, next) => {
    res.status(200).json({})
  })
