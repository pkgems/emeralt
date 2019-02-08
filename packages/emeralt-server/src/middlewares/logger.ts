import { TEmeraltMiddlewareParams } from '@emeralt/types'
import morgan from 'morgan'

export const loggerMiddleware = (params: TEmeraltMiddlewareParams) =>
  params.config.logLevel !== 'silent'
    ? morgan(params.config.logLevel)
    : (req, res, next) => next()
