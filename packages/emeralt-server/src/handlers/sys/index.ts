import { TEmeraltHandlerParams } from '@emeralt/types'
import { Router } from 'express'

// handlers
import { sysHealthzHandler } from './healthz'

export const sysHandler = (params: TEmeraltHandlerParams) =>
  Router().use(sysHealthzHandler(params))
