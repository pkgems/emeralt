import { TEmeraltHandlerParams } from '@emeralt/types'

// handlers
import { pingHandler } from './ping'
import { searchHandler } from './search'
import { packagesHandler } from './packages'
import { distTagsHandler } from './dist-tags'
import { loginHandler } from './login'
import { adduserHandler } from './adduser'
import { sysHandler } from './sys'

export const createHandlers = (params: TEmeraltHandlerParams) => ({
  ping: pingHandler(params),
  search: searchHandler(params),
  packages: packagesHandler(params),
  distTags: distTagsHandler(params),
  login: loginHandler(params),
  adduser: adduserHandler(params),
  sys: sysHandler(params),
})
