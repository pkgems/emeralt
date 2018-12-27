import { EmeraltStorage } from './storage'
import { EmeraltAuth } from './auth'
import { EmeraltPlugin } from './plugin'
import { Server } from 'http'

export type TEmeraltServerConfig = {
  logLevel?:
    | 'combined'
    | 'common'
    | 'dev'
    | 'short'
    | 'tiny'
    | 'silent'
}

export type TEmeraltServerParams = {
  config: TEmeraltServerConfig
  storage: EmeraltStorage
  auth: EmeraltAuth
  plugins: EmeraltPlugin[]
}

export interface IEmeraltServer {
  (params: TEmeraltServerParams): Server
}
