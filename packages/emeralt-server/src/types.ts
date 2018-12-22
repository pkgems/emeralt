import { TEmeraltServerParams } from '@emeralt/types/src/index'
import { Router } from 'express'

export interface IHandler {
  (params: TEmeraltServerParams): Router
}
