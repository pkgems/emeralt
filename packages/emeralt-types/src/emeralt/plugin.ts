import { OptionalPromise } from '../helpers'

export type THealthz = {
  ok: boolean
  message?: string
  error?: Error
}

export interface CEmeraltPlugin {
  healthz(): OptionalPromise<THealthz>
}
