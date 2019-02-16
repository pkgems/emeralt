import express from 'express'
import http from 'http'
import merge from 'deepmerge'

import {
  TEmeraltServerParams,
  TEmeraltServerParamsInternal,
  emeraltServerDefaultConfig,
} from '@emeralt/types'
import { createServices } from '@/services'
import { createMiddlewares } from '@/middlewares'
import { createHandlers } from '@/handlers'

type EmeraltServer = http.Server & {
  emeralt: TEmeraltServerParamsInternal
}

const initializeInternal = async (
  params: TEmeraltServerParams,
): Promise<TEmeraltServerParamsInternal> => {
  const database = await params.database(params.config)
  const auth = await params.auth(params.config, database)
  const storage = await params.storage(params.config, database)

  // @ts-ignore
  return {
    ...params,

    database,
    auth,
    storage,
  }
}

export const createEmeraltRouter = async (params: TEmeraltServerParams) => {
  // merge with default config
  params.config = merge(emeraltServerDefaultConfig, params.config || {})

  // initialize plugins
  const internal = await initializeInternal(params)

  const services = createServices(internal)
  const middlewares = createMiddlewares({ ...internal, services })
  const handlers = createHandlers({ ...internal, services, middlewares })

  const router = express()
    // options
    .set('etag', false)

    // middlewares
    .use(middlewares.logger)
    .use(middlewares.json)
    .use(middlewares.compression)
    .use(middlewares.context)

    // handlers
    .use(handlers.ping)
    .use(handlers.login)
    .use(handlers.adduser)
    .use(handlers.search)
    .use(handlers.packages)

  return router
}

export const createEmeraltServer = async (params: TEmeraltServerParams) => {
  const router = await createEmeraltRouter(params)

  const httpServer = http.createServer(router) as EmeraltServer

  return httpServer
}