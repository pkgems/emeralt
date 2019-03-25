import { TEmeraltMiddlewareParams } from '@emeralt/types'

const authBasic = async (token: string, { auth }: TEmeraltMiddlewareParams) => {
  // token = username:password | base64
  const [username, password] = Buffer.from(token, 'base64')
    .toString()
    .split(':')

  const valid = await auth.comparePassword(username, password)

  if (valid) {
    return { username }
  } else {
    throw new Error('Invalid username or password')
  }
}

const authBearer = (token: string, { services }: TEmeraltMiddlewareParams) => {
  return services.jwt.verify(token)
}

export const decodeAuthToken = async (
  auth: string,
  params: TEmeraltMiddlewareParams,
) => {
  // auth = "type token"
  const [type, token] = auth.split(' ')

  if (type === 'Basic') {
    return authBasic(token, params)
  }

  if (type === 'Bearer') {
    return authBearer(token, params)
  }

  // TODO: Support more auth types?
  throw new Error('Unsupported auth type')
}
