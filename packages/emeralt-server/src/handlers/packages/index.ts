import { IEmeraltServerHandler } from '@emeralt/types'
import { Router } from 'express'

// routes
import { getPackage } from './get-package'

export const packages: IEmeraltServerHandler = () => {
  const router = Router()

  router.use(getPackage)

  return router
}
