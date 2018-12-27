export const RegistryAuthenticateEndpoint = '/-/user/:user'

export type TRegistryAuthenticateQuery = {}

export type TRegistryAuthenticateParams = {
  user: string
}

export type TRegistryAuthenticateRequestBody = {
  _id: string
  name: string
  password: string
  email: string
  type: string
  roles: string[]
  date: string
}

export type TRegistryAuthenticateResponseBody = {
  ok: boolean
  id: string
  rev?: string
  token?: string | void
}
