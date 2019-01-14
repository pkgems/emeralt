import test from 'ava'
import { createMocks } from './mocks'

test('adduser', async (t) => {
  const { client, auth, address } = await createMocks()

  const response = await client.adduser(address, client.config)

  t.is(response.ok, true)
  t.is(response.id, auth.username)
})

test('adduser malformed', async (t) => {
  const { client, auth, address } = await createMocks()

  await t.throwsAsync(
    client.adduser(address, {
      ...client.config,
      auth: {
        username: 'a',
        password: 'b',
        email: 'a@b.c',
      },
    }),
  )
})
