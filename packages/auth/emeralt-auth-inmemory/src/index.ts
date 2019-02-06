import {
  CEmeraltAuth,
  TEmeraltAuthAction,
  CEmeraltDatabase,
  IEmeraltAuth,
} from '@emeralt/types'

const base64 = {
  encode: (str) => Buffer.from(str).toString('base64'),
  decode: (str) => Buffer.from(str, 'base64').toString('ascii'),
}

class CEmeraltAuthInMemory implements CEmeraltAuth {
  private users: Map<string, string>

  constructor(
    private db: CEmeraltDatabase,
    users: Record<string, string> = {},
  ) {
    this.users = new Map()

    for (const username in users) {
      this.users.set(username, base64.encode(users[username]))
    }
  }

  public hasUser(username) {
    return this.users.has(username)
  }

  public putUser(username: string, password: string) {
    this.users.set(username, base64.encode(password))
  }

  public comparePassword(username: string, password: string) {
    const hash = this.users.get(username)

    return Boolean(hash && password && base64.decode(hash) === password)
  }

  public async canUser(
    username: string,
    action: TEmeraltAuthAction,
    name: string,
  ) {
    if (action === 'get') {
      // TODO
      return true
    } else {
      const metadata = await this.db.getMetadata(name)

      return !metadata || metadata._owner === username
    }
  }
}

export const EmeraltAuthInMemory: IEmeraltAuth<{
  users: Record<string, string>
}> = ({ users }) => (_, db) => new CEmeraltAuthInMemory(db, users)
