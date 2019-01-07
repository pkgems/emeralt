import { TEmeraltHandlerParams } from '@emeralt/types'

import { ping } from './ping'
import { search } from './search'
import { packages } from './packages'
import { login } from './login'
import { authenticate } from './authenticate'

export const createHandlers = (params: TEmeraltHandlerParams) => ({
  ping: ping(params),
  search: search(params),
  packages: packages(params),
  login: login(params),
  authenticate: authenticate(params),
})
