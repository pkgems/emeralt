import { IHandler } from '../types'
import { Router } from 'express'

const RegistryPingEndpoint = '/-/ping'

export const ping: IHandler = () =>
  Router().get(RegistryPingEndpoint, (req, res) => {
    res.status(200).json({})
  })
