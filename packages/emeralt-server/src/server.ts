import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'

import { IEmeraltServer } from '@emeralt/types'
import {
  ping,
  search,
  packages,
  login,
  authenticate,
} from './handlers'
import { logger } from './middlewares/logger'

export const createEmeraltServer: IEmeraltServer = (params) => {
  const server = express()

  // options
  server.set('etag', false)

  // middlewares
  server.use(logger(params.config.logLevel))
  server.use(bodyParser.json())

  // handlers
  server.use(ping(params))
  server.use(login(params))
  server.use(authenticate(params))
  server.use(search(params))
  server.use(packages(params))

  return http.createServer(server)
}
