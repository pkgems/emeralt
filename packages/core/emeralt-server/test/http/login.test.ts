import { interpolatePath } from '@emeralt/utils'
import supertest from 'supertest'
import test from 'ava'

import { endpoints } from '@/constants'
import { createMockServer } from '@test/mocks'

test('login', async (t) => {
  const { server } = createMockServer()

  const { status, body } = await supertest(server).post(
    interpolatePath(endpoints.login, { user: 'tester' }),
  )

  t.is(status, 401)
  t.deepEqual(body, {
    error: '',
  })
})
