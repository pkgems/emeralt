import express from 'express'
import http from 'http'

import { TEmeraltServerParams } from '@emeralt/types'
import { createServices } from '@/services'
import { createMiddlewares } from '@/middlewares'
import { createHandlers } from '@/handlers'
import { TEmeraltServerParamsInternal } from '@emeralt/types/src/emeralt'

type EmeraltServer = http.Server & {
  emeralt: TEmeraltServerParamsInternal
}

export const createEmeraltServer = (params: TEmeraltServerParams) => {
  const internal: TEmeraltServerParamsInternal = {
    config: params.config,
    auth: params.auth(params.config),
    database: params.database(params.config),
    storage: params.storage(params.config),
  }

  const services = createServices(internal)
  const middlewares = createMiddlewares({ ...internal, services })
  const handlers = createHandlers({ ...internal, services, middlewares })

  const server = express()
    // options
    .set('etag', false)

    // middlewares
    .use(middlewares.logger)
    .use(middlewares.json)
    .use(middlewares.compression)
    .use(middlewares.context)
    .use(middlewares.errorHandler)

    // handlers
    .use(handlers.ping)
    .use(handlers.login)
    .use(handlers.adduser)
    .use(handlers.search)
    .use(handlers.packages)

  const httpServer = http.createServer(server) as EmeraltServer

  httpServer.emeralt = internal

  return httpServer
}
