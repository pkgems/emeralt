import { EmeraltAuth } from '@emeralt/types'
import jwt from 'jsonwebtoken'

// TODO: encrypt passwords
export class EmeraltAuthInMemory extends EmeraltAuth {
  public secret = 'secret'
  public users: Map<string, string>

  constructor() {
    super()

    this.users = new Map()
  }

  async authenticate(username: string, password: string) {
    if (this.users.has(username) && this.users.get(username) === password) {
      return jwt.sign({ username }, this.secret)
    } else {
      return null
    }
  }

  async addUser(username: string, password: string) {
    if (!this.users.get(username)) {
      this.users.set(username, password)

      return true
    } else {
      return false
    }
  }

  async removeUser(username: string) {
    if (this.users.get(username)) {
      this.users.delete(username)

      return true
    } else {
      return false
    }
  }
}
