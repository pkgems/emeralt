import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const sysHealthzHandler = ({
  auth,
  database,
  storage,
}: TEmeraltHandlerParams) =>
  Router().get(endpoints.sys.healthz, async (req, res, next) => {
    // check healthz simultaneously
    const healthzs = await Promise.all([
      auth.healthz(),
      database.healthz(),
      storage.healthz(),
    ])

    const ok = healthzs.every((o) => o.ok)

    return res.status(ok ? 200 : 503).json({
      ok,
      healthz: {
        auth: healthzs[0],
        database: healthzs[1],
        storage: healthzs[2],
      },
    })
  })
