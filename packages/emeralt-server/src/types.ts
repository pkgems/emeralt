import { TEmeraltServerParams } from '@emeralt/types'
import { Router } from 'express'

export interface IHandler {
  (params: TEmeraltServerParams): Router
}
