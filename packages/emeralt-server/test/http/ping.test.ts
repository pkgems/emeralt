import test from 'ava'
import supertest from 'supertest'
import { createEmeraltServer } from '@/index'

test('ping', async (t) => {
  const server = createEmeraltServer()

  const { status, body } = await supertest(server)
    .get('/-/ping')
    .expect(200)

  t.is(status, 200)
  t.deepEqual(body, {})
})
