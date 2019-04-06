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

test('sys dropdata unauthorized', async (t) => {
  const { status } = await t.context.http.patch('/-/sys/dropdata')

  t.is(status, 401)
})

test('sys dropdata', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  // publish package
  const pubRes = await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .set('authorization', `Bearer ${token}`)
    .send(pkg)
  t.is(pubRes.status, 200)

  // drop data
  const dropRes = await t.context.http
    .patch('/-/sys/dropdata')
    .set('authorization', `Bearer ${token}`)
  t.is(dropRes.status, 200)

  const getRes = await t.context.http.get(`/${encodeURIComponent(pkg.name)}`)
  t.is(getRes.status, 404)
})
