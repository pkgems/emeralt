import { Router } from 'express'
import {
  IHandler,
  RegistryAuthenticateEndpoint,
  RegistryAuthenticateBody,
  RegistryAuthenticateResponseBody,
} from '@emeralt/types'

export const authenticate: IHandler = ({ auth }) =>
  Router().put(
    RegistryAuthenticateEndpoint,
    async (req, res, next) => {
      const body: RegistryAuthenticateBody = req.body

      const token = await auth.authenticate(body.name, body.password)

      const response: RegistryAuthenticateResponseBody = {
        ok: !!token,
        id: body.name,
        token: token,
      }

      res.status(response.ok ? 200 : 401).json(response)
    },
  )
