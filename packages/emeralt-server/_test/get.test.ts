import test from 'ava'
import { resolve } from 'url'
import { createMocks } from './mocks'
import { packagesFixtures } from './fixtures'
import { readPackageJson, publishPackage } from './utils'

test('get upstream', async (t) => {
  const { client, address } = await createMocks()

  const response = await client.get(resolve(address, 'react'), client.config)

  t.is(response._id, 'react')
})

test('get local', async (t) => {
  const { client, address } = await createMocks()

  await publishPackage(client, address, packagesFixtures[0])
  await publishPackage(client, address, packagesFixtures[0], {
    metadata: { version: '2.0.0' },
  })

  const metadata = await readPackageJson(packagesFixtures[0])
  const response = await client.get(
    resolve(address, metadata.name),
    client.config,
  )

  t.is(response._id, metadata.name)
  t.is(response['dist-tags']['latest'], '2.0.0')
  t.deepEqual(Object.keys(response.versions), ['1.0.0', '2.0.0'])
})
