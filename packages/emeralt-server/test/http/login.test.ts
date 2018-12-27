import test from 'ava'
import supertest from 'supertest'
import { RegistryLoginEndpoint } from '@emeralt/types'
import { createEmeraltServerMock } from 'test/fixtures'

test('login', async (t) => {
  const { server } = createEmeraltServerMock()

  const { status, body } = await supertest(server).post(
    RegistryLoginEndpoint,
  )

  t.is(status, 401)
  t.deepEqual(body, {
    error: '',
  })
})
