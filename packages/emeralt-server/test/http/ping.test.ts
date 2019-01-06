import test from 'ava'
import supertest from 'supertest'
import { endpoints } from '@/constants'
import { createMockServer } from '@test/mocks'

test('ping', async (t) => {
  const { server } = createMockServer()

  const { status, body } = await supertest(server).get(endpoints.ping)

  t.is(status, 200)
  t.deepEqual(body, {})
})
