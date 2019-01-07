import {
  IEmeraltAuth,
  IEmeraltDatabase,
  IEmeraltStorage,
  IEmeraltPlugin,
} from '../'
import { Server } from 'http'
import { Router } from 'express'

export type TEmeraltServerConfig = {
  logLevel?: 'combined' | 'common' | 'dev' | 'short' | 'tiny' | 'silent'
}

export type TEmeraltServerParams = {
  config: TEmeraltServerConfig
  auth: IEmeraltAuth
  database: IEmeraltDatabase
  storage: IEmeraltStorage
  plugins: IEmeraltPlugin[]
}

export interface IEmeraltServer {
  (params: TEmeraltServerParams): Server
}

export interface IEmeraltServerHandler {
  (params: TEmeraltServerParams): Router
}
