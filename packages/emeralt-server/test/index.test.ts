import test from 'ava'
import { createEmeraltServer } from '@/index'
import supertest from 'supertest'

class MockStorage {}
class MockAuth {}

test('ping', async (t) => {
  const server = createEmeraltServer({
    config: {},
    storage: new MockStorage(),
    auth: new MockAuth(),
    plugins: [],
  }).listen(null)

  const { status, body } = await supertest(server).get('/-/ping')

  t.is(status, 200)
  t.deepEqual(body, {
    name: 'emeralt',
  })
})

test('search', async (t) => {
  const server = createEmeraltServer({
    config: {},
    storage: new MockStorage(),
    auth: new MockAuth(),
    plugins: [],
  }).listen(null)

  const { body } = await supertest(server)
    .get('/-/v1/search')
    .expect(200)

  t.deepEqual(body, {
    objects: [],
    total: 0,
    time: body.time,
  })
})
