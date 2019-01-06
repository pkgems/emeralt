import test from 'ava'
import supertest from 'supertest'
import { RegistryLoginEndpoint } from '@emeralt/types'
import { createMockServer } from '@test/mocks'

test('login', async (t) => {
  const { server } = createMockServer()

  const { status, body } = await supertest(server).post(
    RegistryLoginEndpoint,
  )

  t.is(status, 401)
  t.deepEqual(body, {
    error: '',
  })
})
