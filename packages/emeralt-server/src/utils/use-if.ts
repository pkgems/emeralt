import { Handler } from 'express'

const stub = (_1, _2, next) => next()

// better name?
export const useIf = (condition: boolean, handler: Handler) =>
  condition ? handler : stub
