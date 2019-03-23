import { TEmeraltHandlerParams } from '@emeralt/types'

import { endpoints } from '@/constants'
import { Router } from 'express'
import { useIf } from '@/utils'

export const getPackageTarballHandler = ({
  config,
  storage,
}: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.package.tarball,
    Router().get(endpoints.package.getTarball, async (req, res) => {
      const { package_name, version } = req.params

      const rs = await storage.createReadStream(package_name, version)

      if (rs) {
        res.header('content-encoding', 'application/octet-stream')
        rs.pipe(res)
      } else {
        res.status(404).json({ ok: false })
      }
    }),
  )
