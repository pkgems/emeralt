import { TEmeraltHandlerParams, TPackage, TVersion } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'
import { pipe, dissoc, path, values, head, assocPath } from 'ramda'
import crypto from 'crypto'

const getMetadata = pipe(
  dissoc('versions'),
  dissoc('_attachments'),
)

const getTarballUrl = (v: TVersion) =>
  `http://localhost:8080/-/tarball/${encodeURIComponent(
    v.name,
  )}/${encodeURIComponent(v.version)}`

const getVersion = pipe(
  path(['versions']),
  values,
  head,
  (v: any) => assocPath(['dist', 'tarball'], getTarballUrl(v), v),
)

const getTarball = pipe(
  path(['_attachments']),
  values,
  head,
)

// const verifyShasum = (integrity, data) => {
//   const [algo, sum] = integrity.split('-')

//   const orig = crypto
//     .createHash(algo)
//     .update(data, 'utf8')
//     .digest('base64')

//   return orig === sum
// }

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

      const metadata = getMetadata(pkg)
      const version = getVersion(pkg)
      const tarball = getTarball(pkg) as any

      await database.putMetadata(pkg.name, metadata)
      await database.putVersion(pkg.name, version.version, version)
      await storage.putTarball(
        pkg.name,
        version.version,
        // @ts-ignore
        Buffer.from(tarball.data, 'base64'),
      )

      res.status(200).json({})
    })
