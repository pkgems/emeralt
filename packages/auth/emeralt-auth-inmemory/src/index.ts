import { IEmeraltAuth, TMetadata } from '@emeralt/types'

const base64 = {
  encode: (str) => Buffer.from(str).toString('base64'),
  decode: (str) => Buffer.from(str, 'base64').toString('ascii'),
}

export const EmeraltAuthInMemory: IEmeraltAuth<{
  users?: {
    [username: string]: string
  }
}> = ({ users }) => async (_, db) => {
  for (const username in users) {
    await db.setKey(['users', username], {
      username,
      password: base64.encode(users[username]),
      email: null,
    })
  }

  return {
    createUser: async (username, password) => {
      const exists = await db.hasKey(['users', username])

      if (!exists) {
        await db.setKey(['users', username], {
          username,
          password: base64.encode(password),
          email: null,
        })

        return true
      } else {
        return false
      }
    },

    deleteUser: async (username) => {
      const exists = await db.hasKey(['users', username])

      console.log(exists)

      if (exists) {
        await db.deleteKey(['users', username])

        return true
      } else {
        return false
      }
    },

    comparePassword: async (username, password) => {
      const user = await db.getKey(['users', username])

      return user ? password === base64.decode(user.password) : false
    },

    canUser: async (username, action, packagename) => {
      if (!(await db.hasKey(['users', username]))) {
        return false
      }

      const metadata = (await db.getKey(['metadata', packagename])) as TMetadata

      return metadata ? metadata._owner === username : true
    },
  }
}
