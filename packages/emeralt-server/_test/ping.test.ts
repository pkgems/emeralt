import test from 'ava'
import { createMocks } from './mocks'

test('ping', async (t) => {
  const { client, address } = await createMocks()

  t.deepEqual(await client.ping(address, client.config), {})
})
