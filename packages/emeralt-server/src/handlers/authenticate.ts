import { Router } from 'express'
import {
  IHandler,
  RegistryAuthorizeEndpoint,
  RegistryAuthorizeBody,
  RegistryAuthorizeResponseBody,
} from '@emeralt/types'

export const authenticate: IHandler = ({ auth }) =>
  Router().put(RegistryAuthorizeEndpoint, async (req, res, next) => {
    const body: RegistryAuthorizeBody = req.body

    const token = await auth.authenticate(body.name, body.password)

    const response: RegistryAuthorizeResponseBody = {
      ok: !!token,
      id: body.name,
      token,
    }

    res.status(response.ok ? 200 : 401).json(response)
  })
