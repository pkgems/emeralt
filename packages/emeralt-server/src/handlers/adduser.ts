import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { useIf } from '@/utils'

export const adduser = ({ auth, config }: TEmeraltHandlerParams) =>
  useIf(
    config.endpoints.adduser,
    Router().put(endpoints.adduser, async (req, res, next) => {
      const { name, password }: TRegistryAuthenticateRequestBody = req.body

      const valid = await auth.comparePassword(name, password)

      return res.status(valid ? 201 : 401).json({
        ok: valid,
        id: name,
        token: valid ? jwt.sign({ name }, 'secret') : null,
      })
    }),
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
