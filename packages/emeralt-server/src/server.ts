import express from 'express'
import http from 'http'
import merge from 'deepmerge'

import { TEmeraltServerParams } from '@emeralt/types'
import { createServices } from '@/services'
import { createMiddlewares } from '@/middlewares'
import { createHandlers } from '@/handlers'

import { emeraltServerDefaultConfig } from './config'
import { TEmeraltServerParamsInternal } from './types'

type EmeraltServer = http.Server & {
  emeralt: TEmeraltServerParamsInternal
}

const initializePlugins = async (
  params: TEmeraltServerParams,
): Promise<TEmeraltServerParamsInternal> => {
  const config = merge(emeraltServerDefaultConfig, params.config || {})
  const database = await params.database(params.config)
  const auth = await params.auth(params.config, database)
  const storage = await params.storage(params.config, database)

  // @ts-ignore
  return {
    ...params,

    config,
    database,
    auth,
    storage,
  }
}

export const createEmeraltRouter = async (params: TEmeraltServerParams) => {
  // initialize plugins and config
  const plugins = await initializePlugins(params)

  if (plugins.config.initialHealthcheck) {
    // check every plugin is health. If no, throw an error
    const health = await Promise.all([
      plugins.auth.healthz(),
      plugins.database.healthz(),
      plugins.storage.healthz(),
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
  }

  const services = createServices(plugins)
  const middlewares = createMiddlewares({ ...plugins, services })
  const handlers = createHandlers({ ...plugins, services, middlewares })

  const router = express
    .Router()
    // middlewares
    .use(middlewares.logger)
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
    plugins.config[key] = value
  }

  return { router, plugins }
}

export const createEmeraltServer = async (params: TEmeraltServerParams) => {
  const { router, plugins } = await createEmeraltRouter(params)
  const app = express()
    .set('etag', false)
    .use(router)

  const server = http.createServer(app) as EmeraltServer

  // ↑ HACK FOR TESTS ↑
  // @ts-ignore
  server._setConfig = router._setConfig

  return { server, plugins }
}
