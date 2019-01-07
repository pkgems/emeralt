import { IEmeraltAuth, IEmeraltStorage, IEmeraltPlugin } from '../'
import { Server } from 'http'
import { Router } from 'express'

export type TEmeraltServerConfig = {
  logLevel?: 'combined' | 'common' | 'dev' | 'short' | 'tiny' | 'silent'
}

export type TEmeraltServerParams = {
  config: TEmeraltServerConfig
  storage: IEmeraltStorage
  auth: IEmeraltAuth
  plugins: IEmeraltPlugin[]
}

export interface IEmeraltServer {
  (params: TEmeraltServerParams): Server
}

export interface IEmeraltServerHandler {
  (params: TEmeraltServerParams): Router
}
