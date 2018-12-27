export const RegistryAuthenticateEndpoint = '/-/user/:user'

export type RegistryAuthenticateQuery = {}

export type RegistryAuthenticateParams = {
  user: string
}

export type RegistryAuthenticateBody = {
  _id: string
  name: string
  password: string
  email: string
  type: string
  roles: string[]
  date: string
}

export type RegistryAuthenticateResponseBody = {
  ok: boolean
  id: string
  rev?: string
  token?: string | void
}
