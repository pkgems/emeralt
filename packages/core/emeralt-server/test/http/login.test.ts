import test from 'ava'
import supertest from 'supertest'
import { endpoints } from '@/constants'
import { interpolatePath } from '@test/utils'
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
