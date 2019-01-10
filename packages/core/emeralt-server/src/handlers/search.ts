import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const search = (params: TEmeraltHandlerParams) =>
  Router().get(endpoints.search, (req, res) => {
    res.status(200).json({
      objects: [],
      total: 0,
      time: new Date().toString(),
    })
  })
