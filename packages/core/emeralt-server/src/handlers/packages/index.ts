import { TEmeraltHandlerParams } from '@emeralt/types'
import { Router } from 'express'

// routes
import { getPackage } from './get-package'
import { publishpackage } from './publish-package'
import { getTarball } from './get-tarball'

export const packages = (params: TEmeraltHandlerParams) =>
  Router()
    .use(getPackage(params))
    .use(getTarball(params))
    .use(publishpackage(params))
