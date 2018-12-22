import { Router } from 'express'
import { IHandler } from '@/types'

const RegistrySearchEndpoint = '/-/v1/search'

interface IRegistrySearchQuery {
  text?: string
  size?: number
  from?: number
  quality?: number
  popularity?: number
  maintenance?: number
}

type TRegistrySearchOutput = {
  objects: any[]
  total: number // objects.length
  time: string // date
}

export const search: IHandler = () =>
  Router().get(RegistrySearchEndpoint, (req, res) => {
    const query: IRegistrySearchQuery = req.query

    const response: TRegistrySearchOutput = {
      objects: [],
      total: 0,
      time: new Date().toString(),
    }

    res.status(200).json(response)
  })
