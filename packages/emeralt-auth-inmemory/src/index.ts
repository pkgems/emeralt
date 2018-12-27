import { IEmeraltAuth } from '@emeralt/types'
import jwt from 'jsonwebtoken'

type TEmeraltAuthInMemoryParams = {
  users?: Map<string, string>
  secret?: string
  encrypt?: boolean
}

// TODO: Refactor
const mergeWithDefaultParams = (
  params: TEmeraltAuthInMemoryParams = {},
) => ({
  users: new Map(params.users || []),
  secret: params.secret || 'secret',
  encrypt:
    typeof params.encrypt === 'boolean' ? params.encrypt : true,
})

// TODO: encrypt passwords
export class EmeraltAuthInMemory implements IEmeraltAuth {
  private crypto?: any

  public secret: string
  public users: Map<string, string>
  public encrypt: boolean

  constructor(params?: TEmeraltAuthInMemoryParams) {
    Object.assign(this, mergeWithDefaultParams(params))

    if (this.encrypt) {
      this.crypto = require('./crypto')
    }
  }

  async initialize() {
    if (this.encrypt) {
      await Promise.all(
        Array.from(this.users).map(async ([username, password]) => {
          this.users.set(username, await this.crypto.hash(password))
        }),
      )
    }

    return this
  }

  async authenticate(username: string, password: string) {
    const userPassword = this.users.get(username)

    if (
      userPassword &&
      (this.encrypt
        ? await this.crypto.compare(password, userPassword)
        : userPassword === password)
    ) {
      return jwt.sign({ username }, this.secret)
    } else {
      return null
    }
  }

  async addUser(username: string, password: string) {
    if (!this.users.get(username)) {
      this.users.set(
        username,
        this.encrypt ? await this.crypto.hash(password) : password,
      )

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
