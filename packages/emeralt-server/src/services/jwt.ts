import { TEmeraltServiceParams, TDecodedToken } from '@emeralt/types'
import jwt from 'jsonwebtoken'

export const jwtService = (params: TEmeraltServiceParams) => {
  const { secret } = params.config.jwt

  return {
    sign: (data: TDecodedToken) => jwt.sign(data, secret),
    verify: (token: string) => jwt.verify(token, secret) as TDecodedToken,
  }
}
