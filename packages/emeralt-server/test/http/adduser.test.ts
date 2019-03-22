import { createTest } from '../utils/test'

const test = createTest()

test('adduser', async (t) => {
  const { username, password } = t.context.fixtures.users[0]

  const res = await t.context.http.put(`/-/user/${username}`).send({
    name: username,
    password: password,
  })

  t.deepEqual(res.status, 201)
  t.is(res.body.ok, true)
  t.is(res.body.id, username)
  t.truthy(res.body.token)
})

test('adduser malformed', async (t) => {
  const { username } = t.context.fixtures.users[0]

  const res = await t.context.http.put(`/-/user/${username}`).send({
    name: username,
    password: 'wrong-password',
  })

  t.is(res.status, 401)
})

test('adduser nonexistent', async (t) => {
  const { password } = t.context.fixtures.users[0]

  const res = await t.context.http.put(`/-/user/wrong-username`).send({
    name: 'wrong-username',
    password: password,
  })

  t.is(res.status, 401)
})

test('adduser empty', async (t) => {
  const { username } = t.context.fixtures.users[0]

  const res = await t.context.http.put(`/-/user/${username}`).send({})

  t.is(res.status, 401)
})
