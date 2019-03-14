import { Router } from 'express';
// handlers
import { getPackageHandler } from './get';
import { publishPackageHandler } from './publish';
import { getPackageTarballHandler } from './tarball';
export const packagesHandler = (params) => Router()
    .use(getPackageHandler(params))
    .use(publishPackageHandler(params))
    .use(getPackageTarballHandler(params));
