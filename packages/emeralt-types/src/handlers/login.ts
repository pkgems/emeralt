export const RegistryLoginEndpoint = '/-/v1/login'

export type RegistryLoginBody = {
  hostname: string
}

export type TRegistryLoginResponseBody = {
  error: string
}
