import { TEmeraltMiddlewareParams } from '@emeralt/types'
import { ErrorRequestHandler } from 'express'

export const errorHandlerMiddleware = (
  params: TEmeraltMiddlewareParams,
): ErrorRequestHandler => (err, req, res, next) => {
  console.error(err)

  return res.status(500).json({
    ok: false,
    message: 'Internal Server Error',
  })
}
