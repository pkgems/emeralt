import { TEmeraltHandlerParams, TPackage } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const publishpackage = ({
  middlewares,
  database,
  storage,
}: TEmeraltHandlerParams) =>
  Router()
    .use(middlewares.verifyToken)
    .put(endpoints.package.publish, async (req, res, next) => {
      // const { name: username } = req.context.decodedToken

      const pkg = req.body as TPackage
      const version = Object.values(pkg.versions)[0]
      const tarball = Object.values(pkg._attachments)[0].data

      await storage.putTarball(pkg.name, version.version, tarball)

      // functional
      delete version._attachments

      await database.putVersion(pkg.name, version.version, version)

      res.status(200).json({})
    })
