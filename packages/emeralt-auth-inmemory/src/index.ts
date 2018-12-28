import { IEmeraltAuth } from '@emeralt/types'
import jwt from 'jsonwebtoken'

const base64 = {
  encode: (str) => Buffer.from(str).toString('base64'),
  decode: (str) => Buffer.from(str, 'base64').toString('ascii'),
}

type TEmeraltAuthInMemoryParams = {
  secret?: string
  users?: {
    [username: string]: string
  }
}

export class EmeraltAuthInMemory implements IEmeraltAuth {
  public secret: string
  public users: Map<string, string>

  constructor({ secret, users }: TEmeraltAuthInMemoryParams = {}) {
    this.secret = secret || 'secret'
    this.users = new Map()

    for (const username in users) {
      this.users.set(username, base64.encode(users[username]))
    }
  }

  async authenticate(username: string, password: string) {
    const userPassword = this.users.get(username)

    if (userPassword && base64.decode(userPassword) === password) {
      return jwt.sign({ username }, this.secret)
    } else {
      return null
    }
  }

  async addUser(username: string, password: string) {
    if (!this.users.get(username)) {
      this.users.set(username, base64.encode(password))

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
