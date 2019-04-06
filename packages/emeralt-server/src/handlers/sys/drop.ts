import { Router } from 'express'

import { TEmeraltHandlerParams } from '@/types'
import { endpoints } from '@/constants'

export const sysDropdataHandler = ({
  auth,
  database,
  storage,

  middlewares,
}: TEmeraltHandlerParams) =>
  Router().patch(
    endpoints.sys.dropdata,
    middlewares.verifyToken,
    async (req, res, next) => {
      try {
        if (
          !(await auth.canUser(req.context.decodedToken.username, 'dropdata'))
        ) {
          return res.status(403).send()
        }

        await Promise.all([database.dropData(), storage.dropData()])

        return res.status(200).json({
          ok: true,
          message: 'Data was successfully dropped',
        })
      } catch (error) {
        return res.status(500).json({
          ok: false,
        })
      }
    },
  )
