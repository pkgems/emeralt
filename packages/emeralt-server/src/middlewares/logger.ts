import { TEmeraltMiddlewareParams } from '@emeralt/types'
import morgan from 'morgan'
import pino from 'express-pino-logger'

export const loggerMiddleware = (params: TEmeraltMiddlewareParams) => {
  switch (params.config.logLevel) {
    case 'dev':
      return morgan('dev')

    case 'production':
      return pino()

    default:
      return (req, res, next) => next()
  }
}
