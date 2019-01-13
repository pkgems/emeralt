import test from 'ava'
import { createMocks } from './mocks'
import { Stream, Readable } from 'stream'
import packlist from 'npm-packlist'
import tar from 'tar'
import { packagesFixtures } from '@test/fixtures'
import { join } from 'path'
import { readFile } from 'fs-extra'

const createTarStream = async (pkgDir: string) => {
  const files = await packlist({ path: pkgDir })

  const readable = tar.create(
    {
      cwd: pkgDir,
      gzip: true,
    },
    files,
  )

  return new Readable().wrap(readable)
}

const readPackageJson = async (pkgDir) =>
  JSON.parse(await readFile(join(pkgDir, 'package.json'), 'utf8'))

test('publish', async (t) => {
  const { client, address } = await createMocks()

  const [pkg] = packagesFixtures

  const res = await client.publish(address, {
    ...client.config,
    access: 'public',
    body: await createTarStream(pkg),
    metadata: await readPackageJson(pkg),
  })

  t.deepEqual(res, {})
})

test('reject publish the same version', async (t) => {
  const { client, address } = await createMocks()

  const [pkg] = packagesFixtures

  await client.publish(address, {
    ...client.config,
    access: 'public',
    body: await createTarStream(pkg),
    metadata: await readPackageJson(pkg),
  })

  await t.throwsAsync(
    client.publish(address, {
      ...client.config,
      access: 'public',
      body: await createTarStream(pkg),
      metadata: await readPackageJson(pkg),
    }),
  )
})

// test('reject unauthorized publish', async (t) => {
//   const { client, address } = await createMocks()

//   const [pkg] = packagesFixtures

//   await client.publish(address, {
//     ...client.config,
//     access: 'public',
//     auth: {
//       username: 'user1',
//       password: 'user1',
//       email: 'user1@user1.user1',
//     },
//     body: await createTarStream(pkg),
//     metadata: await readPackageJson(pkg),
//   })

//   await t.throwsAsync(
//     client.publish(address, {
//       ...client.config,
//       auth: {
//         username: 'user2',
//         password: 'user2',
//         email: 'user2@user2.user2',
//       },
//       access: 'public',
//       body: await createTarStream(pkg),
//       metadata: {
//         ...(await readPackageJson(pkg)),
//         version: '2.0.0',
//       },
//     }),
//   )
// })
