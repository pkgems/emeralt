import { TEmeraltMiddlewareParams } from '@emeralt/types'
import { json } from 'body-parser'
import compression from 'compression'
import { loggerMiddleware } from './logger'
import { verifyTokenMiddleware } from './verify-token'
import { dataProviderMiddleware } from './data-provider'

export const createMiddlewares = (params: TEmeraltMiddlewareParams) => ({
  json: json({
    limit: '64MB',
  }),
  compression: compression(),
  dataProvider: dataProviderMiddleware(params),
  logger: loggerMiddleware(params),
  verifyToken: verifyTokenMiddleware(params),
})
