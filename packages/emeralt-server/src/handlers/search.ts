import {
  IEmeraltServerHandler,
  RegistrySearchEndpoint,
  TRegistrySearchQuery,
  TRegistrySearchResponseBody,
} from '@emeralt/types'
import { Router } from 'express'

export const search: IEmeraltServerHandler = () =>
  Router().get(RegistrySearchEndpoint, (req, res) => {
    const query: TRegistrySearchQuery = req.query

    const response: TRegistrySearchResponseBody = {
      objects: [],
      total: 0,
      time: new Date().toString(),
    }

    res.status(200).json(response)
  })
