import { TEmeraltMiddlewareParams } from '@emeralt/types'
import { json } from 'body-parser'
import compression from 'compression'
import { loggerMiddleware } from './logger'
import { verifyTokenMiddleware } from './verify-token'
import { contextMiddleware } from './context'
import { errorHandlerMiddleware } from './error-handler'

export const createMiddlewares = (params: TEmeraltMiddlewareParams) => ({
  json: json({
    limit: '64MB',
  }),
  compression: compression(),
  context: contextMiddleware(params),
  logger: loggerMiddleware(params),
  verifyToken: verifyTokenMiddleware(params),
  errorHandler: errorHandlerMiddleware(params),
})
