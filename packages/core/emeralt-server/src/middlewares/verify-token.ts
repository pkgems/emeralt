import { TEmeraltMiddlewareParams } from '@emeralt/types'

export const verifyTokenMiddleware = ({
  services,
}: TEmeraltMiddlewareParams) => (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization) {
    return res.status(401).json({
      ok: false,
      message: 'Unauthorized',
    })
  }

  const [type, token] = authorization.split(' ')

  try {
    if (type === 'Bearer') {
      req.context.decodedToken = services.jwt.verify(token)

      return next()
    }

    return res.status(401).json({
      ok: false,
      message: 'Unsupported auth type',
    })
  } catch ({ message }) {
    return res.status(401).json({
      ok: false,
      message,
    })
  }
}
