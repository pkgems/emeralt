import test from 'ava'
import { createMocks } from './mocks'

test('adduser', async (t) => {
  const { client, auth, address } = await createMocks()

  const response = await client.adduser(address, client.config)

  t.is(response.ok, true)
  t.is(response.id, auth.username)
})
