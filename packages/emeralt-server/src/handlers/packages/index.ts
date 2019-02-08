import { TEmeraltHandlerParams } from '@emeralt/types'
import { Router } from 'express'

// routes
import { getHandler } from './get'
import { publishHandler } from './publish'
import { tarballHandler } from './tarball'

export const packages = (params: TEmeraltHandlerParams) =>
  Router()
    .use(getHandler(params))
    .use(publishHandler(params))
    .use(tarballHandler(params))
