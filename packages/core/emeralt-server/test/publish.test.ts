import test from 'ava'
import { createMocks } from './mocks'
import { publishPackage } from './utils'
import { packagesFixtures } from './fixtures'

test('publish', async (t) => {
  const { client, address } = await createMocks()

  const res = await publishPackage(client, address, packagesFixtures[0])

  t.deepEqual(res, {})
})

test('publish with token', async (t) => {
  const { client, address } = await createMocks()

  const { token } = await client.adduser(address, client.config)

  await t.throwsAsync(
    publishPackage(client, address, packagesFixtures[0], {
      auth: { token: 'abced' },
    }),
  )

  t.deepEqual(
    await publishPackage(client, address, packagesFixtures[0], {
      auth: { token },
    }),
    {},
  )
})

test('reject publish the same version', async (t) => {
  const { client, address } = await createMocks()

  await publishPackage(client, address, packagesFixtures[0])

  await t.throwsAsync(publishPackage(client, address, packagesFixtures[0]))
})

test('reject unauthorized publish', async (t) => {
  const { client, address } = await createMocks()

  await publishPackage(client, address, packagesFixtures[0], {
    auth: {
      username: 'user1',
      password: 'user1',
      email: 'user1@user1.user1',
    },
  })

  await t.throwsAsync(
    publishPackage(client, address, packagesFixtures[0], {
      auth: {
        username: 'user2',
        password: 'user2',
        email: 'user2@user2.user2',
      },
      metadata: {
        version: '2.0.0',
      },
    }),
  )
})

test('reject unauthenticated publish', async (t) => {
  const { client, address } = await createMocks()

  await t.throwsAsync(
    publishPackage(client, address, packagesFixtures[0], {
      auth: {
        username: 'a',
        password: 'b',
        email: 'a@b.c',
      },
      metadata: {
        version: '3.0.0',
      },
    }),
  )
})
