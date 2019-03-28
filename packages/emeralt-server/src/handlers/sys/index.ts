import { Router } from 'express'
import { TEmeraltHandlerParams } from '@/types'

// handlers
import { sysHealthzHandler } from './healthz'

export const sysHandler = (params: TEmeraltHandlerParams) =>
  Router().use(sysHealthzHandler(params))
