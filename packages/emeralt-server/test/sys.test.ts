import test from 'ava'
import supertest from 'supertest'
import { createFixtures } from './fixtures'
import { endpoints } from '../src/constants'

test('sys healthz', async (t) => {
  const fixtures = await createFixtures()

  const { status, body } = await supertest(fixtures.server).get(
    endpoints.sys.healthz,
  )

  t.is(status, 200)
  t.deepEqual(body, {
    ok: true,
    healthz: {
      auth: { ok: true },
      database: { ok: true },
      storage: { ok: true },
    },
  })
})
