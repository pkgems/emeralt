import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const getTarball = ({ database, storage }: TEmeraltHandlerParams) =>
  Router().get(endpoints.package.getTarball, async (req, res, next) => {
    const { name, version } = req.params

    const rs = await storage.getTarball(name, version)

    res.header('content-encoding', 'application/octet-stream')
    rs.pipe(res)
  })
