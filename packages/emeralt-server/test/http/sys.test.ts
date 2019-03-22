import { createTest } from '../utils/test'

const test = createTest()

test('sys healthz', async (t) => {
  const { status, body } = await t.context.http.get('/-/sys/healthz')

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
