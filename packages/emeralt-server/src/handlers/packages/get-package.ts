import { IHandler } from '@emeralt/types'
import { Router } from 'express'

export const getPackage: IHandler = () =>
  Router().get('/:package_name', (req, res, next) => {
    res.status(200).json({})
  })
