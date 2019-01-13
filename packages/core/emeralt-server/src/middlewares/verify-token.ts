import { TEmeraltMiddlewareParams } from '@emeralt/types'

export const verifyTokenMiddleware = ({
  services,
  auth,
}: TEmeraltMiddlewareParams) => async (req, res, next) => {
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
    } else if (type === 'Basic') {
      const [username, password] = Buffer.from(token, 'base64')
        .toString()
        .split(':')

      const valid = await auth.comparePassword(username, password)

      if (valid) {
        req.context.decodedToken = {
          name: username,
        }

        return next()
      } else {
        throw new Error('Invalid username or password')
      }
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
