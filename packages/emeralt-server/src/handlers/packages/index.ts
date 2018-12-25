import { IHandler } from '@/types'
import { Router } from 'express'

// routes
import { getPackage } from './get-package'

export const packages: IHandler = () => {
  const router = Router()

  router.use(getPackage)

  return router
}
