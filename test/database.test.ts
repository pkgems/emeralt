import { IEmeraltDatabase } from '@emeralt/types'

import { test } from './utils'
import { metadata, version } from './fixtures'

test<IEmeraltDatabase>('metadata', async (t, dbc) => {
  // @ts-ignore
  const db = await dbc({})({})

  t.log('healthz')
  t.deepEqual(await db.healthz(), { ok: true })

  t.log('no metadata')
  t.deepEqual(await db.hasMetadata(metadata.name), false)
  t.falsy(await db.getMetadata(metadata.name))
  t.deepEqual(await db.getMetadatas(), {})

  t.log('put metadata')
  await db.putMetadata(metadata.name, metadata)
  await new Promise((r) => setTimeout(r, 1000)) // changes may take time to propogate in some dbs

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
  t.falsy(await db.getVersion(metadata.name, version.version))
  t.deepEqual(await db.getVersions(metadata.name), {})

  t.log('put version')
  await db.putVersion(metadata.name, version.version, version)
  await new Promise((r) => setTimeout(r, 1000)) // changes may take time to propogate in some dbs

  t.log('with version')
  t.deepEqual(await db.hasVersion(metadata.name, version.version), true)
  t.deepEqual(await db.getVersion(metadata.name, version.version), version)
  t.deepEqual(await db.getVersions(metadata.name), {
    [version.version]: version,
  })
})
