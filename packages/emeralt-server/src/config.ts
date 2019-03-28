import { TEmeraltServerConfig } from '@emeralt/types'

const getLogLevel = () => {
  if (process.env.NODE_ENV === 'test') return 'silent'
  if (process.env.NODE_ENV === 'production') return 'production'
  else return 'development'
}

export const emeraltServerDefaultConfig: TEmeraltServerConfig = {
  url: 'http://localhost:8080',
  logLevel: getLogLevel(),
  jwt: {
    secret: 'secret',
    expiresIn: '7d',
  },
  initialHealthcheck: true,
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
