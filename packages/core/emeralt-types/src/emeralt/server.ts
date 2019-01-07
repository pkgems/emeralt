import {
  IEmeraltAuth,
  IEmeraltDatabase,
  IEmeraltStorage,
  IEmeraltPlugin,
} from '@emeralt/types'
import { createServices } from '../../../emeralt-server/src/services'
import { createMiddlewares } from '../../../emeralt-server/src/middlewares'

export type TEmeraltServerConfig = {
  logLevel: 'combined' | 'common' | 'dev' | 'short' | 'tiny' | 'silent'
  jwt: {
    secret: string
  }
}

export type TEmeraltServerParams = {
  config: TEmeraltServerConfig
  auth: IEmeraltAuth
  database: IEmeraltDatabase
  storage: IEmeraltStorage
  plugins: IEmeraltPlugin[]
}

export type TEmeraltServiceParams = TEmeraltServerParams

export type TEmeraltMiddlewareParams = TEmeraltServerParams & {
  services: ReturnType<typeof createServices>
}

export type TEmeraltHandlerParams = TEmeraltServerParams & {
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
