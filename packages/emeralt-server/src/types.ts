import {
  TEmeraltServerConfig,
  CEmeraltAuth,
  CEmeraltDatabase,
  CEmeraltStorage,
} from '@emeralt/types'
import { createServices } from './services'
import { createMiddlewares } from './middlewares'

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
  username: string
  iat?: number
  exp?: number
}

declare global {
  namespace Express {
    interface Request {
      context: {
        decodedToken?: TDecodedToken
      }
    }
  }
}
