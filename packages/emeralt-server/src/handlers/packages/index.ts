import { Router } from 'express'
import { TEmeraltHandlerParams } from '@/types'

// handlers
import { getPackageHandler } from './get'
import { publishPackageHandler } from './publish'
import { getPackageTarballHandler } from './tarball'

export const packagesHandler = (params: TEmeraltHandlerParams) =>
  Router()
    .use(getPackageHandler(params))
    .use(publishPackageHandler(params))
    .use(getPackageTarballHandler(params))
