import test from 'ava'
import supertest from 'supertest'
import { endpoints } from '@/constants'
import { createMockServer } from '@test/mocks'

test('search', async (t) => {
  const { server } = createMockServer()

  const { status, body } = await supertest(server).get(endpoints.search)

  t.is(status, 200)
  t.deepEqual(body, {
    objects: [],
    total: 0,
    time: body.time,
  })
})
