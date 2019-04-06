import { IEmeraltAuth, IEmeraltDatabase, IEmeraltStorage } from '@emeralt/types'

export type TEmeraltServerConfig = {
  url?: string
  logLevel?: 'silent' | 'development' | 'production'
  jwt?: {
    secret?: string
    expiresIn?: string | number
  }
  initialHealthcheck?: boolean
  upstream?: string | boolean
  endpoints?: {
    ping?: boolean
    search?: boolean
    login?: boolean
    adduser?: boolean

    package?: {
      get?: boolean
      publish?: boolean
      tarball?: boolean
    }

    distTags?: {
      get?: boolean
      create?: boolean
      delete?: boolean
    }

    sys?: {
      healthz?: boolean
      dropdata?: boolean
    }
  }
}

export type TEmeraltServerParams = {
  config?: TEmeraltServerConfig
  auth: ReturnType<IEmeraltAuth>
  database: ReturnType<IEmeraltDatabase>
  storage: ReturnType<IEmeraltStorage>
}
