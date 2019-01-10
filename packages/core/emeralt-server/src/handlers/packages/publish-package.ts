import { TEmeraltHandlerParams, TPackage, TVersion } from '@emeralt/types'
import { extractPackageData } from '@/utils/extract-package-data'
import { endpoints } from '@/constants'

import { Router } from 'express'
import ssri from 'ssri'

export const publishpackage = ({
  middlewares,
  database,
  storage,
}: TEmeraltHandlerParams) =>
  Router()
    .use(middlewares.verifyToken)
    .put(endpoints.package.publish, async (req, res, next) => {
      // const { name: username } = req.context.decodedToken

      const { metadata, version, tarball } = extractPackageData(
        req.body as TPackage,
      )

      if (!(await ssri.checkData(tarball.data, version.dist.integrity))) {
        return res.status(400).json({
          ok: false,
          message: 'Integrity verification failed',
        })
      }

      console.log(metadata)

      await database.putMetadata(metadata.name, metadata)
      await database.putVersion(metadata.name, version.version, version)
      await storage.putTarball(metadata.name, version.version, tarball.data)

      res.status(200).json({})
    })
