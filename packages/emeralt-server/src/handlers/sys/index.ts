import { Router } from 'express'
import { TEmeraltHandlerParams } from '@/types'

// handlers
import { sysHealthzHandler } from './healthz'
import { sysDropdataHandler } from './drop'

export const sysHandler = (params: TEmeraltHandlerParams) =>
  Router()
    .use(sysHealthzHandler(params))
    .use(sysDropdataHandler(params))
