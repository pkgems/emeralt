import { IEmeraltServer } from '@emeralt/types'
import express from 'express'
import http from 'http'

import { ping, search } from './handlers'

export const createEmeraltServer: IEmeraltServer = (params) => {
  const server = express()

  server.use(ping(params))
  server.use(search(params))

  return http.createServer(server)
}
