import { TEmeraltMiddlewareParams } from '@emeralt/types'
import { Handler } from 'express'

export const dataProviderMiddleware = (
  params: TEmeraltMiddlewareParams,
): Handler => (req, res, next) => {
  req.context = {}

  next()
}
