import test from 'ava'
import supertest from 'supertest'
import { authenticateFixtures } from '@test/fixtures'
import { createMockServer } from '@test/mocks'

test('authenticate', async (t) => {
  const { server, auth } = createMockServer()

  for (const { request, response } of authenticateFixtures) {
    const { status, body } = await supertest(server)
      .put(request.url)
      .send(request.body)

    t.is(status, response.status)
    t.deepEqual(body, response.body)
  }
})
