import test from 'ava'
import supertest from 'supertest'
import { endpoints } from '@/constants'
import { createMockServer } from '@test/mocks'

test('ping', async (t) => {
  const { address } = createMockServer()

  const { status, body } = await supertest(address).get(endpoints.ping)

  t.is(status, 200)
  t.deepEqual(body, {})
})
