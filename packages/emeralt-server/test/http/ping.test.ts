import test from 'ava'
import supertest from 'supertest'
import { RegistryPingEndpoint } from '@emeralt/types'
import { createEmeraltServerMock } from 'test/fixtures'

test('ping', async (t) => {
  const { server } = createEmeraltServerMock()

  const { status, body } = await supertest(server).get(
    RegistryPingEndpoint,
  )

  t.is(status, 200)
  t.deepEqual(body, {})
})
