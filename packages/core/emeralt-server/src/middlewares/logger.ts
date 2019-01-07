import morgan from 'morgan'
import { TEmeraltServerConfig } from '@emeralt/types'

export const logger = (logLevel: TEmeraltServerConfig['logLevel']) =>
  logLevel && logLevel !== 'silent'
    ? morgan(logLevel)
    : (req, res, next) => next()
