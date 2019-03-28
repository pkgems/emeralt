import { Handler } from 'express'
import { TEmeraltMiddlewareParams } from '@/types'

export const contextMiddleware = (
  params: TEmeraltMiddlewareParams,
): Handler => (req, res, next) => {
  res.setHeader('X-Powered-By', 'Emeralt')

  req.context = {}

  next()
}
