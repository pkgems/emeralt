import { IEmeraltDatabase } from '@emeralt/types'

import { test } from './utils'
import { metadata, version } from './fixtures'

test<IEmeraltDatabase>('metadata', async (t, dbc) => {
  // @ts-ignore
  const db = await dbc({})({})

  t.log('no metadata')
  t.deepEqual(await db.hasMetadata(metadata.name), false)
  t.deepEqual(await db.getMetadata(metadata.name), undefined)
  t.deepEqual(await db.getMetadatas(), {})

  t.log('put metadata')
  await db.putMetadata(metadata.name, metadata)

  t.log('with metadata')
  t.deepEqual(await db.hasMetadata(metadata.name), true)
  t.deepEqual(await db.getMetadata(metadata.name), metadata)
  t.deepEqual(await db.getMetadatas(), {
    [metadata.name]: metadata,
  })
})

test<IEmeraltDatabase>('versions', async (t, dbc) => {
  // @ts-ignore
  const db = await dbc({})({})

  t.log('no version')
  t.deepEqual(await db.hasVersion(metadata.name, version.version), false)
  t.deepEqual(await db.getVersion(metadata.name, version.version), undefined)
  t.deepEqual(await db.getVersions(metadata.name), {})

  t.log('put version')
  await db.putVersion(metadata.name, version.version, version)

  t.log('with version')
  t.deepEqual(await db.hasVersion(metadata.name, version.version), true)
  t.deepEqual(await db.getVersion(metadata.name, version.version), version)
  t.deepEqual(await db.getVersions(metadata.name), {
    [version.version]: version,
  })
})
