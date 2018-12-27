import { Router } from 'express'
import { TEmeraltServerParams } from '../../'

export interface IHandler {
  (params: TEmeraltServerParams): Router
}

export * from './ping'
export * from './search'
export * from './login'
export * from './authenticate'
