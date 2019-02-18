import { TEmeraltServerConfig } from '@emeralt/types'

export const emeraltServerDefaultConfig: TEmeraltServerConfig = {
  logLevel: 'dev',
  jwt: {
    secret: 'secret',
  },
  endpoints: {
    ping: true,
    search: true,
    login: true,
    adduser: true,

    package: {
      get: true,
      publish: true,
    },
  },
}
