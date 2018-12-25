import { IEmeraltServer } from '@emeralt/types'
import express from 'express'
import http from 'http'

import { ping, search, packages } from './handlers'

export const createEmeraltServer: IEmeraltServer = (params) => {
  const server = express()

  // options
  server.set('etag', false)

  // handlers
  server.use(ping(params))
  server.use(search(params))
  server.use(packages(params))

  return http.createServer(server)
}
