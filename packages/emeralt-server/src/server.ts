import { IEmeraltServer } from '@emeralt/types'
import express from 'express'
import http from 'http'

import { ping, search, packages } from './handlers'
import { logger } from './middlewares/logger'

export const createEmeraltServer: IEmeraltServer = (params) => {
  const server = express()

  // options
  server.set('etag', false)

  // middlewares
  server.use(logger(params.config.logLevel))

  // handlers
  server.use(ping(params))
  server.use(search(params))
  server.use(packages(params))

  return http.createServer(server)
}
