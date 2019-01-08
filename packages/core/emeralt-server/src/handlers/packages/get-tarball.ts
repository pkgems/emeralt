import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'
import { Readable } from 'stream'

export const getTarball = ({ database, storage }: TEmeraltHandlerParams) =>
  Router().get(endpoints.package.getTarball, async (req, res, next) => {
    const { name, version } = req.params
    const tarball = await storage.getTarball(name, version)

    const rs = new Readable()
    rs.push(tarball)
    rs.push(null)

    res.header('content-encoding', 'application/octet-stream')
    rs.pipe(res)
  })
