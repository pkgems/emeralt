import { TEmeraltHandlerParams } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const login = (params: TEmeraltHandlerParams) =>
  Router().post(endpoints.login, (req, res) => {
    res.status(401).json({
      error: '',
    })
  })
