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
  }).listen(8080)

  await supertest(server)
    .get('/-/ping')
    .expect(200)
    .expect({
      name: 'emeralt',
    })

  t.pass()
})

test('search', async (t) => {
  const server = createEmeraltServer({
    config: {},
    storage: new MockStorage(),
    auth: new MockAuth(),
    plugins: [],
  }).listen(8081)

  await supertest(server)
    .get('/-/v1/search')
    .expect(200)
    .expect({
      objects: [],
      total: 0,
      time: new Date().toString(),
    })

  t.pass()
})
