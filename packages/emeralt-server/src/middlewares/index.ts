import { TEmeraltMiddlewareParams } from '@emeralt/types'
import { json, text } from 'body-parser'
import compression from 'compression'

import { loggerMiddleware } from './logger'
import { verifyTokenMiddleware } from './verify-token'
import { contextMiddleware } from './context'

export const createMiddlewares = (params: TEmeraltMiddlewareParams) => ({
  json: json({
    limit: '64MB',
  }),

  text: text({
    limit: '128KB',
    type: 'json',
  }),
  compression: compression(),
  context: contextMiddleware(params),
  logger: loggerMiddleware(params),
  verifyToken: verifyTokenMiddleware(params),
})
