import { TEmeraltServerConfig } from '@emeralt/types'

export const emeraltServerDefaultConfig: TEmeraltServerConfig = {
  logLevel: 'dev',
  jwt: {
    secret: 'secret',
  },
  url: 'http://localhost:8080',
  endpoints: {
    ping: true,
    search: true,
    login: true,
    adduser: true,

    package: {
      get: true,
      publish: true,
      tarball: true,
    },

    distTags: {
      get: true,
      create: true,
      delete: true,
    },

    sys: {
      healthz: true,
    },
  },
}
