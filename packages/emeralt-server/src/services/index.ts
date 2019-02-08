import { TEmeraltServiceParams } from '@emeralt/types'
import { jwtService } from './jwt'

export const createServices = (params: TEmeraltServiceParams) => ({
  jwt: jwtService(params),
})
