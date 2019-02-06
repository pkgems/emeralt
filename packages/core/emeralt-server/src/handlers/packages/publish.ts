import { TEmeraltHandlerParams, TMetadata } from '@emeralt/types'
import { extractPackageData } from '@/utils'
import { endpoints } from '@/constants'

import { Router } from 'express'
import ssri from 'ssri'

export const publishHandler = ({
  middlewares,
  database,
  storage,
  auth,
}: TEmeraltHandlerParams) =>
  Router().put(
    endpoints.package.publish,
    middlewares.verifyToken,
    async (req, res) => {
      const { name: username } = req.context.decodedToken

      const { metadata, version, tarball } = extractPackageData(
        req.body as TMetadata,
      )

      try {
        if (!metadata || !version || !tarball) {
          throw new Error('Missing package data')
        }

        if (!(await ssri.checkData(tarball.data, version.dist.integrity))) {
          throw new Error('Integrity verification failed')
        }

        if (!(await auth.canUser(username, 'publish', metadata.name))) {
          throw new Error('User is not allowed to publish this package')
        }

        if (await database.hasVersion(metadata.name, version.version)) {
          throw new Error("Can't overwrite an existing version")
        }

        metadata._owner = username

        // update or create metadata
        await database.putMetadata(metadata.name, metadata)

        // create version
        await database.putVersion(metadata.name, version.version, version)

        // upload tarball
        await storage.putTarball(metadata.name, version.version, tarball.data)

        return res.status(200).json({})
      } catch (error) {
        return res.status(400).json({
          ok: false,
          message: error.message,
        })
      }
    },
  )
