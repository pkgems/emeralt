import { createTest } from '../utils/test'

const test = createTest()

test.serial('publish two versions', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .set('authorization', `Bearer ${token}`)
    .send(pkg)

  pkg.versions['2.0.0'] = pkg.versions['1.0.0']
  delete pkg.versions['1.0.0']

  pkg.version = '2.0.0'
  pkg.versions['2.0.0'].version = '2.0.0'

  await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .set('authorization', `Bearer ${token}`)
    .send(pkg)

  t.pass()
})

test.serial('get', async (t) => {
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http.get(`/${encodeURIComponent(pkg.name)}`)

  t.deepEqual(res.status, 200)
  t.snapshot(res.body)
})

test.serial('get nonexistent', async (t) => {
  const res = await t.context.http.get(`/react`)

  t.deepEqual(res.status, 404)
})
