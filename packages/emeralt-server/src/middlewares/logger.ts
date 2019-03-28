import morgan from 'morgan'
import pino from 'express-pino-logger'
import { TEmeraltMiddlewareParams } from '@/types'

export const loggerMiddleware = (params: TEmeraltMiddlewareParams) => {
  switch (params.config.logLevel) {
    case 'development':
      return morgan('dev')

    case 'production':
      return pino()

    default:
      return (req, res, next) => next()
  }
}
