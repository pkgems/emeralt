import { interpolatePath } from '@emeralt/utils'
import supertest from 'supertest'
import test from 'ava'

import { endpoints } from '@/constants'
import { createMockServer } from '@test/mocks'
import { authenticateFixtures } from '@test/fixtures'

test('authenticate', async (t) => {
  const { server } = createMockServer()

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
