import RegClient from 'npm-registry-client'
import doasync from 'doasync'
import npmlog from 'npmlog'

export const createMockClient = () => {
  const auth = {
    username: 'user1',
    password: 'user1',
    email: 'user1@user1.user1',
  }

  const client = doasync(
    new RegClient({
      ssl: {
        strict: false,
      },
      auth,
      log: npmlog,
    }),
  )

  client.config.auth = auth

  return { client, auth }
}
