import express from 'express'
import http from 'http'

import { TEmeraltServerParams } from '@emeralt/types'
import { createServices } from '@/services'
import { createMiddlewares } from '@/middlewares'
import { createHandlers } from '@/handlers'

export const createEmeraltServer = (params: TEmeraltServerParams) => {
  const services = createServices(params)
  const middlewares = createMiddlewares({ ...params, services })
  const handlers = createHandlers({ ...params, services, middlewares })

  const server = express()
    // options
    .set('etag', false)

    // middlewares
    .use(middlewares.logger)
    .use(middlewares.json)
    .use(middlewares.dataProvider)

    // handlers
    .use(handlers.ping)
    .use(handlers.login)
    .use(handlers.authenticate)
    .use(handlers.search)
    .use(handlers.packages)

  return http.createServer(server)
}
