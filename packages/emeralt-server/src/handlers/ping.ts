import {
  IHandler,
  RegistryPingEndpoint,
  TRegistryPingResponseBody,
} from '@emeralt/types'
import { Router } from 'express'

export const ping: IHandler = () =>
  Router().get(RegistryPingEndpoint, (req, res) => {
    const response: TRegistryPingResponseBody = {}

    res.status(200).json(response)
  })
