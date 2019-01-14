import { IEmeraltAuth, IEmeraltDatabase, IEmeraltStorage } from '@emeralt/types'
import { createServices } from '../../../emeralt-server/src/services'
import { createMiddlewares } from '../../../emeralt-server/src/middlewares'
import { CEmeraltAuth } from './auth'
import { CEmeraltDatabase } from './database'
import { CEmeraltStorage } from './storage'

export type TEmeraltServerConfig = {
  logLevel: 'combined' | 'common' | 'dev' | 'short' | 'tiny' | 'silent'
  jwt: {
    secret: string
  }
}

export type TEmeraltServerParams = {
  config: TEmeraltServerConfig
  auth: ReturnType<IEmeraltAuth>
  database: ReturnType<IEmeraltDatabase>
  storage: ReturnType<IEmeraltStorage>
}

export type TEmeraltServerParamsInternal = {
  config: TEmeraltServerConfig
  auth: CEmeraltAuth
  database: CEmeraltDatabase
  storage: CEmeraltStorage
}

export type TEmeraltServiceParams = TEmeraltServerParamsInternal

export type TEmeraltMiddlewareParams = TEmeraltServerParamsInternal & {
  services: ReturnType<typeof createServices>
}

export type TEmeraltHandlerParams = TEmeraltServerParamsInternal & {
  services: ReturnType<typeof createServices>
  middlewares: ReturnType<typeof createMiddlewares>
}

export type TDecodedToken = {
  name: string
  iat?: number
  exp?: number
}

declare global {
  namespace Express {
    type Context = {
      decodedToken?: TDecodedToken
    }

    interface Request {
      context: Context
    }
  }
}
