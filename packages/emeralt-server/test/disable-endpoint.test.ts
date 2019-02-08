import test from 'ava'
import { createMocks } from './mocks'

test('disabled endpoint', async (t) => {
  const { client, address } = await createMocks({
    serverConfig: {
      endpoints: {
        ping: false,
      },
    },
  })

  await t.throwsAsync(client.ping(address, client.config))
})
