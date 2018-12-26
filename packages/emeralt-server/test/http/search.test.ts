import test from 'ava'
import supertest from 'supertest'
import { createEmeraltServer } from '@/index'

test('search', async (t) => {
  const server = createEmeraltServer()

  const { body } = await supertest(server)
    .get('/-/v1/search')
    .expect(200)

  t.deepEqual(body, {
    objects: [],
    total: 0,
    time: body.time,
  })
})
