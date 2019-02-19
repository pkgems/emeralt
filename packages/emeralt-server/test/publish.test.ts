import test from 'ava'
import { createFixtures } from './fixtures'
import { publish } from './shortcuts'

test('publish', async (t) => {
  const fixtures = await createFixtures()

  t.true(await publish(fixtures, fixtures.users[0], fixtures.packages[0]))
  t.true(await publish(fixtures, fixtures.users[0], fixtures.packages[1]))
})

test('publish existing', async (t) => {
  const fixtures = await createFixtures()

  t.true(await publish(fixtures, fixtures.users[0], fixtures.packages[0]))
  await t.throwsAsync(
    publish(fixtures, fixtures.users[1], fixtures.packages[0]),
  )
})

test('publish unauthenticated', async (t) => {
  const fixtures = await createFixtures()

  await t.throwsAsync(
    publish(
      fixtures,
      { ...fixtures.users[0], password: 'wrong-password' },
      fixtures.packages[0],
    ),
  )
})
