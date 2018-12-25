import test from 'ava'
import supertest from 'supertest'
import { createEmeraltServer } from '@/index'
import { MockStorage, MockAuth } from '../fixtures'

test('ping', async (t) => {
  const server = createEmeraltServer({
    config: {},
    storage: new MockStorage(),
    auth: new MockAuth(),
    plugins: [],
  })

  const { status, body } = await supertest(server)
    .get('/-/ping')
    .expect(200)

  t.is(status, 200)
  t.deepEqual(body, {})
})
