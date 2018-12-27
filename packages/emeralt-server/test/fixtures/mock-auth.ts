import { EmeraltAuth } from '@emeralt/types'
import sinon from 'sinon'

export class MockAuth implements EmeraltAuth {
  authenticate = sinon.fake(async (username, password) => {
    return null
  })

  addUser = sinon.fake(async () => {
    return false
  })

  removeUser = sinon.fake(async () => {
    return false
  })
}
