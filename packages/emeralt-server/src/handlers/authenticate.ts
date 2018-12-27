import { Router } from 'express'
import {
  IEmeraltServerHandler,
  RegistryAuthenticateEndpoint,
  TRegistryAuthenticateRequestBody,
  TRegistryAuthenticateResponseBody,
} from '@emeralt/types'

export const authenticate: IEmeraltServerHandler = ({ auth }) =>
  Router().put(
    RegistryAuthenticateEndpoint,
    async (req, res, next) => {
      const body: TRegistryAuthenticateRequestBody = req.body

      const token = await auth.authenticate(body.name, body.password)

      const response: TRegistryAuthenticateResponseBody = {
        ok: !!token,
        id: body.name,
        token: token,
      }

      res.status(response.ok ? 200 : 401).json(response)
    },
  )
