import { Router } from 'express'
import { IHandler } from '@/types'

const RegistryPingEndpoint = '/-/ping'

export const ping: IHandler = () =>
  Router().get(RegistryPingEndpoint, (req, res) => {
    res.status(200).json({
      name: 'emeralt',
    })
  })
