import test from 'ava'
import supertest from 'supertest'
import { endpoints } from '@/constants'
import { interpolatePath } from '@test/utils'
import { createMockServer } from '@test/mocks'
import { authenticateFixtures } from '@test/fixtures'

test('authenticate', async (t) => {
  const { server, auth } = createMockServer()

  for (const { request, response } of authenticateFixtures) {
    const { status, body } = await supertest(server)
      .put(
        interpolatePath(endpoints.authenticate, {
          name: request.body.name,
        }),
      )
      .send(request.body)

    t.is(status, response.status)
    t.deepEqual(body, response.body)
  }
})
