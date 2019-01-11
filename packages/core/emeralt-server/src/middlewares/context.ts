import { TEmeraltMiddlewareParams } from '@emeralt/types'
import { Handler } from 'express'

export const contextMiddleware = (
  params: TEmeraltMiddlewareParams,
): Handler => (req, res, next) => {
  req.context = {}

  next()
}
