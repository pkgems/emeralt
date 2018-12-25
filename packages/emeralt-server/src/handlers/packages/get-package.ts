import { IHandler } from '@/types'
import { Router } from 'express'

export const getPackage: IHandler = () =>
  Router().get('/:package_org?/:package_name', (req, res, next) => {
    res.status(200).json({})
  })
