import test from 'ava'
import { createFixtures } from './fixtures'
import { publish } from './shortcuts'

const getMetadataSnapshot = (metadata: any) => ({
  ...metadata,
  _integrity: 'skipped',
  _resolved: 'skipped',
  _shasum: 'skipped',
})

const getPackumentSnapshot = (packument: any) => ({
  ...packument,
  _owner: 'skipped',
  versions: Object.keys(packument.versions).map((version) => ({
    ...packument.versions[version],
    _nodeVersion: 'skipped',
    dist: {
      ...packument.versions[version].dist,
      integrity: 'skipped',
      shasum: 'skipped',
      tarball: 'skipped',
    },
  })),
})

test('get metadata', async (t) => {
  const fixtures = await createFixtures()

  await publish(fixtures, fixtures.users[0], fixtures.packages[0], '1.0.0')
  await publish(fixtures, fixtures.users[0], fixtures.packages[0], '2.0.0')

  t.snapshot(
    getMetadataSnapshot(
      await fixtures.client('manifest')(fixtures.packages[0].metadata.name),
    ),
  )

  t.snapshot(
    getMetadataSnapshot(
      await fixtures.client('manifest')(
        `${fixtures.packages[0].metadata.name}@1.0.0`,
      ),
    ),
  )

  t.snapshot(
    getMetadataSnapshot(
      await fixtures.client('manifest')(
        `${fixtures.packages[0].metadata.name}@2.0.0`,
      ),
    ),
  )

  await t.throwsAsync(
    fixtures.client('manifest')(`${fixtures.packages[0].metadata.name}@3.0.0`),
    'No matching version found for @test/package-1@3.0.0',
  )
})

test('get packument', async (t) => {
  const fixtures = await createFixtures()

  await publish(fixtures, fixtures.users[0], fixtures.packages[0], '1.0.0')
  await publish(fixtures, fixtures.users[0], fixtures.packages[0], '2.0.0')

  t.snapshot(
    getPackumentSnapshot(
      await fixtures.client('packument')(fixtures.packages[0].metadata.name),
    ),
  )
})

test('get tarball', async (t) => {
  const fixtures = await createFixtures()

  await publish(fixtures, fixtures.users[0], fixtures.packages[0], '1.0.0')
  await publish(fixtures, fixtures.users[0], fixtures.packages[0], '2.0.0')

  t.true(
    (await fixtures.client('tarball')(
      fixtures.packages[0].metadata.name,
    )) instanceof Buffer,
  )

  t.true(
    (await fixtures.client('tarball')(
      `${fixtures.packages[0].metadata.name}@2.0.0`,
    )) instanceof Buffer,
  )

  await t.throwsAsync(
    fixtures.client('tarball')(`${fixtures.packages[0].metadata.name}@3.0.0`),
  )
  await t.throwsAsync(
    fixtures.client('tarball')(fixtures.packages[1].metadata.name),
  )
})
