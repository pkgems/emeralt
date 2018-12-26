import { IEmeraltServer, TEmeraltServerParams } from '@emeralt/types'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import deepmerge from 'deepmerge'

import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { ping, search, packages, login, authenticate } from './handlers'
import { logger } from './middlewares/logger'

const defaultParams: TEmeraltServerParams = {
  config: {
    logLevel: null,
  },
  auth: new EmeraltAuthInMemory(),
  storage: new class Storage {}(),
  plugins: [],
}

export const createEmeraltServer: IEmeraltServer = (params = {}) => {
  params = deepmerge(defaultParams, params)

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
