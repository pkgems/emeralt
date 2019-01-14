import test from 'ava'
import { createMocks } from './mocks'
import { resolve } from 'url'
import { packagesFixtures } from './fixtures'
import { createTarStream, readPackageJson } from './utils'

test('get upstream', async (t) => {
  const { client, address } = await createMocks()

  const response = await client.get(resolve(address, 'react'), client.config)

  t.is(response._id, 'react')
})

test('get local', async (t) => {
  const { client, address } = await createMocks()

  const [pkg] = packagesFixtures

  const body = await createTarStream(pkg)
  const metadata = await readPackageJson(pkg)

  await client.publish(address, {
    ...client.config,
    access: 'public',
    body,
    metadata,
  })

  const response = await client.get(
    resolve(address, metadata.name),
    client.config,
  )

  t.is(response._id, metadata.name)
})
