import { Server } from 'http'

export class EmeraltStorage {}
export class EmeraltAuth {}
export class EmeraltPlugin {}

export type TEmeraltServerConfig = {}

export type TEmeraltServerParams = {
  config: TEmeraltServerConfig
  storage: EmeraltStorage
  auth: EmeraltAuth
  plugins: EmeraltPlugin[]
}

export interface IEmeraltServer {
  (params: TEmeraltServerParams): Server
}
