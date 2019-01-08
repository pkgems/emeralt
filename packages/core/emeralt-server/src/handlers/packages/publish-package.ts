import { TEmeraltHandlerParams, TPackage, TVersion } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'
import { pipe, dissoc } from 'ramda'
import ssri from 'ssri'

// filter keys with pure js in a few lines?
const getMetadata = pipe(
  dissoc('versions'),
  dissoc('_attachments'),
)

const getTarballUrl = (v: TVersion) =>
  `http://localhost:8080/-/tarball/${encodeURIComponent(
    v.name,
  )}/${encodeURIComponent(v.version)}`

const getVersion = (pkg: TPackage) => Object.values(pkg.versions).shift()

const getTarball = (pkg: TPackage) => {
  const tb = Object.values(pkg._attachments).shift()

  return {
    ...tb,
    data: Buffer.from(tb.data, 'base64'),
  }
}

export const publishpackage = ({
  middlewares,
  database,
  storage,
}: TEmeraltHandlerParams) =>
  Router()
    .use(middlewares.verifyToken)
    .put(endpoints.package.publish, async (req, res, next) => {
      const { name: username } = req.context.decodedToken

      const pkg = req.body as TPackage

      const metadata = getMetadata(pkg) as TPackage
      const version = getVersion(pkg) as TVersion
      const tarball = getTarball(pkg)

      if (!(await ssri.checkData(tarball.data, version.dist.integrity))) {
        return res.status(400).json({
          ok: false,
          message: 'Integrity verification failed',
        })
      }

      version.dist.tarball = getTarballUrl(version)

      await database.putMetadata(pkg.name, metadata)
      await database.putVersion(pkg.name, version.version, version)
      await storage.putTarball(pkg.name, version.version, tarball.data)

      res.status(200).json({})
    })
