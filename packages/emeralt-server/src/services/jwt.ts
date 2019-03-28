import { TEmeraltServiceParams, TDecodedToken } from '@/types'
import jwt from 'jsonwebtoken'

export const jwtService = (params: TEmeraltServiceParams) => {
  const { secret, expiresIn } = params.config.jwt

  return {
    sign: (data: TDecodedToken) => jwt.sign(data, secret, { expiresIn }),
    verify: (token: string) => jwt.verify(token, secret) as TDecodedToken,
  }
}
