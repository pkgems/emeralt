import { TEmeraltHandlerParams } from '@emeralt/types'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { endpoints } from '@/constants'
import { useIf } from '@/utils'

export const adduserHandler = ({
  config,
  middlewares,
  services,
  auth,
}: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.adduser,
    Router().put(
      endpoints.adduser,
      middlewares.json,
      async (req, res, next) => {
        const {
          name: username,
          password,
        }: TRegistryAuthenticateRequestBody = req.body

        const valid = await auth.comparePassword(username, password)

        return res.status(valid ? 201 : 401).json({
          ok: valid,
          id: username,
          token: valid ? services.jwt.sign({ username }) : null,
        })
      },
    ),
  )

type TRegistryAuthenticateRequestBody = {
  _id: string
  name: string
  password: string
  email: string
  type: string
  roles: string[]
  date: string
}
