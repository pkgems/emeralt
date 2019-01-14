import { IEmeraltAuth, TMetadata } from '@emeralt/types'

const base64 = {
  encode: (str) => Buffer.from(str).toString('base64'),
  decode: (str) => Buffer.from(str, 'base64').toString('ascii'),
}

export const EmeraltAuthInMemory: IEmeraltAuth<{
  users?: {
    [username: string]: string
  }
}> = ({ users }) => (_, db) => {
  for (const username in users) {
    db.setKey(['users', username], {
      username,
      password: base64.encode(users[username]),
      email: null,
    })
  }

  return {
    createUser: (username, password) => {
      const exists = db.hasKey(['users', username])

      if (!exists) {
        db.setKey(['users', username], {
          username,
          password: base64.encode(password),
          email: null,
        })

        return true
      } else {
        return false
      }
    },

    deleteUser: (username) => {
      const exists = db.hasKey(['users', username])

      if (exists) {
        db.deleteKey(['users', username])

        return true
      } else {
        return false
      }
    },

    comparePassword: (username, password) => {
      const user = db.getKey(['users', username])

      return user ? password === base64.decode(user.password) : false
    },

    canUser: (username, action, packagename) => {
      if (!db.hasKey(['users', username])) {
        return false
      }

      const metadata = db.getKey(['metadata', packagename]) as TMetadata

      return metadata ? metadata._owner === username : true
    },
  }
}
