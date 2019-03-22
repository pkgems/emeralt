import { TEmeraltHandlerParams, TMetadata } from '@emeralt/types'
import { Router } from 'express'
import ssri from 'ssri'

import { extractPackageData, useIf } from '@/utils'
import { endpoints } from '@/constants'
import { PassThrough, Writable } from 'stream'

const writeBufferToWritable = (writable: Writable, buffer: Buffer) =>
  new Promise((resolve, reject) => {
    writable.on('finish', resolve).on('error', reject)

    const rs = new PassThrough()

    rs.pipe(writable)
    rs.push(buffer)
    rs.push(null)
    rs.end()
  })

export const publishPackageHandler = ({
  config,
  middlewares,
  database,
  storage,
  auth,
}: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.package.publish,
    Router().put(
      endpoints.package.publish,
      middlewares.verifyToken,
      middlewares.json,
      async (req, res) => {
        const { username } = req.context.decodedToken

        try {
          const { metadata, version, tarball } = extractPackageData(
            req.body as TMetadata,
          )

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
          await writeBufferToWritable(
            await storage.createWriteStream(metadata.name, version.version),
            tarball.data,
          )

          return res.status(200).json({})
        } catch (error) {
          return res.status(400).json({
            ok: false,
            message: error.message,
          })
        }
      },
    ),
  )
