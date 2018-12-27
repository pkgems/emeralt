export const RegistryLoginEndpoint = '/-/v1/login'

export type TRegistryLoginRequestBody = {
  hostname: string
}

export type TRegistryLoginResponseBody = {
  error: string
}
