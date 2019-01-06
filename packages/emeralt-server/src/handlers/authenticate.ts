import { IEmeraltServerHandler } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const authenticate: IEmeraltServerHandler = ({ auth }) =>
  Router().put(endpoints.authenticate, async (req, res, next) => {
    const {
      name,
      password,
    }: TRegistryAuthenticateRequestBody = req.body

    const token = await auth.authenticate(name, password)

    res.status(token ? 200 : 401).json({
      ok: !!token,
      id: name,
      token: token,
    })
  })

type TRegistryAuthenticateRequestBody = {
  _id: string
  name: string
  password: string
  email: string
  type: string
  roles: string[]
  date: string
}
