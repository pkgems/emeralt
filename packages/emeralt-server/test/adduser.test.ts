import test from 'ava'
import { adduser } from './shortcuts'
import { createFixtures } from './fixtures'
import { createUser } from './fixtures/user'

test('adduser', async (t) => {
  const fixtures = await createFixtures()

  const res = await adduser(fixtures, fixtures.users[0])

  t.true(res.ok)
  t.is(res.id, fixtures.users[0].username)
  t.is(res.username, fixtures.users[0].username)
  t.truthy(res.token)
})

test('adduser nonexistent user', async (t) => {
  const fixtures = await createFixtures()

  await t.throwsAsync(adduser(fixtures, createUser()))
})

test('adduser wrong password', async (t) => {
  const fixtures = await createFixtures()

  await t.throwsAsync(
    adduser(fixtures, {
      ...fixtures.users[0],
      password: 'wrong-password',
    }),
  )
})

test('adduser empty', async (t) => {
  const fixtures = await createFixtures()

  // @ts-ignore
  await t.throwsAsync(adduser(fixtures, {}))
})
