import test from 'ava'
import supertest from 'supertest'
import {
  authenticateFixtures,
  createEmeraltServerMock,
} from '../fixtures'

test('authenticate', async (t) => {
  const { server, auth } = createEmeraltServerMock()

  for (const { request, response } of authenticateFixtures) {
    const { status, body } = await supertest(server)
      .put(request.url)
      .send(request.body)

    t.is(status, response.status)
    t.deepEqual(body, response.body)

    t.true(auth.authenticate.calledOnce)
    t.true(
      auth.authenticate.calledWith(
        request.body.name,
        request.body.password,
      ),
    )
  }
})
