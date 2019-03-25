import { createTest } from '../utils/test'

const test = createTest()

test.serial('publish unauthenticated', async (t) => {
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .send(pkg)

  t.is(res.status, 401)
})

test.serial('publish', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .set('authorization', `Bearer ${token}`)
    .send(pkg)

  t.deepEqual(res.status, 200)
  t.deepEqual(res.body, {})
})

test.serial('publish existing', async (t) => {
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  const res = await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .set('authorization', `Bearer ${token}`)
    .send(pkg)

  t.is(res.status, 400)
})

test.serial('publish new version using basic auth', async (t) => {
  const user = t.context.fixtures.users[0]
  const token = t.context.fixtures.tokens[0]
  const pkg = t.context.fixtures.packages[0]

  pkg.versions['2.0.0'] = pkg.versions['1.0.0']
  delete pkg.versions['1.0.0']

  pkg.version = '2.0.0'
  pkg.versions['2.0.0'].version = '2.0.0'

  const res = await t.context.http
    .put(`/${encodeURIComponent(pkg.name)}`)
    .set(
      'authorization',
      `Basic ${Buffer.from(user.username + ':' + user.password).toString(
        'base64',
      )}`,
    )
    .send(pkg)

  t.deepEqual(res.status, 200)
  t.deepEqual(res.body, {})
})
