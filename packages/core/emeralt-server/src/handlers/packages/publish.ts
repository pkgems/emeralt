import { TEmeraltHandlerParams, TPackage } from '@emeralt/types'
import { extractPackageData } from '@/utils'
import { endpoints } from '@/constants'

import { Router } from 'express'
import ssri from 'ssri'

export const publishHandler = ({
  middlewares,
  database,
  storage,
}: TEmeraltHandlerParams) =>
  Router()
    .use(middlewares.verifyToken)
    .put(endpoints.package.publish, async (req, res) => {
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

      const existingMetadata = database.getMetadata(metadata.name)

      // check if version exists
      if (
        existingMetadata &&
        Object.keys(existingMetadata.versions).includes(version.version)
      ) {
        return res.status(400).json({
          ok: false,
          message: 'Version already exists',
        })
      }

      await database.putMetadata(metadata.name, metadata)
      await database.putVersion(metadata.name, version.version, version)
      await storage.putTarball(metadata.name, version.version, tarball.data)

      res.status(200).json({})
    })
