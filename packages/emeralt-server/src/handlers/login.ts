import {
  IEmeraltServerHandler,
  RegistryLoginEndpoint,
  TRegistryLoginResponseBody,
} from '@emeralt/types'
import { Router } from 'express'

export const login: IEmeraltServerHandler = () =>
  Router().post(RegistryLoginEndpoint, (req, res) => {
    const response: TRegistryLoginResponseBody = {
      error: '',
    }

    res.status(401).json(response)
  })
