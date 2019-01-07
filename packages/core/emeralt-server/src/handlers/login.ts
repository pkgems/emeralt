import { IEmeraltServerHandler } from '@emeralt/types'
import { endpoints } from '@/constants'
import { Router } from 'express'

export const login: IEmeraltServerHandler = () =>
  Router().post(endpoints.login, (req, res) => {
    res.status(401).json({
      error: '',
    })
  })
