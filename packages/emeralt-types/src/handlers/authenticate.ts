export const RegistryAuthorizeEndpoint = '/-/user/:user'

export type RegistryAuthorizeQuery = {}

export type RegistryAuthorizeParams = {
  user: string
}

export type RegistryAuthorizeBody = {
  _id: string
  name: string
  password: string
  email: string
  type: string
  roles: string[]
  date: string
}

export type RegistryAuthorizeResponseBody = {
  ok: boolean
  id: string
  rev?: string
  token?: string | void
}
