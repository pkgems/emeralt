import { TUser } from '@emeralt/types'
import casual from 'casual'

export const createUser = (): TUser => ({
  username: casual.username,
  password: casual.password,
  email: casual.email,
})
