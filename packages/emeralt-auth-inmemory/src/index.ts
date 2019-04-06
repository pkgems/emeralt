import {
  CEmeraltAuth,
  TEmeraltAuthAction,
  CEmeraltDatabase,
  IEmeraltAuth,
  BaseUser,
} from '@emeralt/types'

const base64 = {
  encode: (str) => Buffer.from(str).toString('base64'),
  decode: (str) => Buffer.from(str, 'base64').toString('ascii'),
}

export interface User extends BaseUser {
  admin?: boolean
}

class CEmeraltAuthInMemory implements CEmeraltAuth<User> {
  private users: Map<string, User>

  constructor(private db: CEmeraltDatabase, users: User[] = []) {
    this.users = new Map<string, User>()

    for (const user of users) {
      this.putUser(user)
    }
  }

  public hasUser(username: string) {
    return this.users.has(username)
  }

  public putUser(user: User) {
    this.users.set(user.username, {
      ...user,
      password: base64.encode(user.password),
    })
  }

  public comparePassword(username: string, password: string) {
    const user = this.users.get(username)

    return Boolean(
      user && password && base64.decode(user.password) === password,
    )
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

  public dropData() {
    this.users.clear()
  }

  public healthz() {
    return { ok: true }
  }
}

export const EmeraltAuthInMemory: IEmeraltAuth<{
  users: User[]
}> = ({ users }) => (_, db) => new CEmeraltAuthInMemory(db, users)
