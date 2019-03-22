import { createTest } from '../utils/test'

const test = createTest()

test.serial('publish package', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .set('authorization', `Bearer ${token}`)
    .send(pkg)

  t.is(res.status, 200)
})

test.serial('create', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http
    .put(`/-/package/${encodeURIComponent(pkg.name)}/dist-tags/test`)
    .set('Content-Type', 'application/json')
    .send('1.0.0-rc.1')
    .set('authorization', `Bearer ${token}`)

  t.deepEqual(res.status, 200)
  t.deepEqual(res.body, { ok: true })
})

test.serial('get', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http
    .get(`/-/package/${encodeURIComponent(pkg.name)}/dist-tags`)
    .set('authorization', `Bearer ${token}`)

  t.deepEqual(res.status, 200)
  t.deepEqual(res.body, {
    latest: '1.0.0',
    test: '1.0.0-rc.1',
  })
})

test.serial('delete', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http
    .delete(`/-/package/${encodeURIComponent(pkg.name)}/dist-tags/test`)
    .set('authorization', `Bearer ${token}`)

  t.deepEqual(res.status, 200)
  t.deepEqual(res.body, { ok: true })

  // check if dist-tag is deleted
  const { body } = await t.context.http
    .get(`/-/package/${encodeURIComponent(pkg.name)}/dist-tags`)
    .set('authorization', `Bearer ${token}`)

  t.deepEqual(body, {
    latest: '1.0.0',
  })
})
