import { TEmeraltMiddlewareParams } from '@emeralt/types'
import { decodeAuthToken } from '@/utils'

export const verifyTokenMiddleware = (params: TEmeraltMiddlewareParams) => (
  req,
  res,
  next,
) => {
  const authorization = req.get('authorization')

  if (!authorization) {
    return res.status(401).json({
      ok: false,
      message: 'Unauthorized',
    })
  }

  decodeAuthToken(authorization, params)
    .then((token) => {
      req.context.decodedToken = token

      process.nextTick(next)
    })
    .catch((err) => {
      return res.status(401).json({
        ok: false,
        message: err.message,
      })
    })
}
