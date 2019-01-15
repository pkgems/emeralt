import test from 'ava'
import { createMocks } from './mocks'
import { packagesFixtures } from './fixtures'
import { publishPackage } from './utils'

test('reject publish with wrong basic auth password', async (t) => {
  const { client, auth, address } = await createMocks()

  await t.throwsAsync(
    publishPackage(client, address, packagesFixtures[0], {
      auth: {
        ...auth,
        password: 'keklol',
      },
    }),
  )
})
