import test from 'ava'
import supertest from 'supertest'
import { RegistryPingEndpoint } from '@emeralt/types'
import { createMockServer } from '@test/mocks'

test('ping', async (t) => {
  const { server } = createMockServer()

  const { status, body } = await supertest(server).get(
    RegistryPingEndpoint,
  )

  t.is(status, 200)
  t.deepEqual(body, {})
})
