import { IEmeraltAuth, IEmeraltDatabase, IEmeraltStorage } from '@emeralt/types'

export type TEmeraltServerConfig = {
  logLevel?: 'silent' | 'dev' | 'production'
  jwt?: {
    secret?: string
  }
  url?: string
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
    }
  }
}

export type TEmeraltServerParams = {
  config?: TEmeraltServerConfig
  auth: ReturnType<IEmeraltAuth>
  database: ReturnType<IEmeraltDatabase>
  storage: ReturnType<IEmeraltStorage>
}
