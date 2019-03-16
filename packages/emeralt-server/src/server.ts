import express from 'express'
import http from 'http'
import merge from 'deepmerge'

import {
  TEmeraltServerParams,
  TEmeraltServerParamsInternal,
} from '@emeralt/types'
import { createServices } from '@/services'
import { createMiddlewares } from '@/middlewares'
import { createHandlers } from '@/handlers'
import { emeraltServerDefaultConfig } from './config'

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

  // check every plugin is health. If no, throw an error
  const health = await Promise.all([
    internal.auth.healthz(),
    internal.database.healthz(),
    internal.storage.healthz(),
  ])

  if (!health.every((s) => s.ok)) {
    throw new Error(
      `Some plugins are unhealthy, ${{
        auth: health[0],
        database: health[1],
        storage: health[2],
      }}`,
    )
  }

  const services = createServices(internal)
  const middlewares = createMiddlewares({ ...internal, services })
  const handlers = createHandlers({ ...internal, services, middlewares })

  const router = express
    .Router()
    // middlewares
    .use(middlewares.logger)
    // .use(middlewares.json)
    .use(middlewares.compression)
    .use(middlewares.context)

    // handlers
    .use(handlers.ping)
    .use(handlers.login)
    .use(handlers.adduser)
    .use(handlers.search)
    .use(handlers.packages)
    .use(handlers.distTags)
    .use(handlers.sys)

  // HACK FOR TESTS
  // used to dynamically change the config
  // @ts-ignore
  router._setConfig = (key, value) => {
    internal.config[key] = value
  }

  return router
}

export const createEmeraltServer = async (params: TEmeraltServerParams) => {
  const router = await createEmeraltRouter(params)
  const server = express()
    .set('etag', false)
    .use(router)

  const httpServer = http.createServer(server) as EmeraltServer

  // ↑ HACK FOR TESTS ↑
  // @ts-ignore
  httpServer._setConfig = router._setConfig

  return httpServer
}
