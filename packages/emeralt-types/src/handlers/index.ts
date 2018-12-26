import { Router } from 'express'
import { TEmeraltServerParams } from '../server'

export interface IHandler {
  (params: TEmeraltServerParams): Router
}

export * from './ping'
export * from './search'
