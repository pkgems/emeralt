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
        if (!(await ssri.checkData(tarball.data, version.dist.integrity))) {
          throw new Error('Integrity verification failed')
        }

        if (!(await auth.canUser(username, 'publish', metadata.name))) {
          throw new Error('User is not allowed to publish this package')
        }

        metadata._owner = username
        ;(await database.hasKey(['metadata', metadata.name]))
          ? await database.updateKey(['metadata', metadata.name], metadata)
          : await database.setKey(['metadata', metadata.name], metadata)

        const versionCreated = await database.createKey(
          ['versions', metadata.name, version.version],
          version,
        )

        if (!versionCreated) {
          throw new Error('Version already exists!')
        }

        await storage.putTarball(metadata.name, version.version, tarball.data)

        return res.status(200).json({})
      } catch (error) {
        console.log(error.message)
        return res.status(400).json({
          ok: false,
          message: error.message,
        })
      }
    },
  )
