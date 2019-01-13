import test from 'ava'
import { EmeraltDatabaseInMemory } from '@/index'

test('init', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.truthy(database.listMetadata)
  t.truthy(database.getMetadata)
  t.truthy(database.putMetadata)

  t.truthy(database.listVersions)
  t.truthy(database.getVersion)
  t.truthy(database.putVersion)
})

test('metadata', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.deepEqual(await database.listMetadata(), {})

  await database.putMetadata('name', { a: 'b' })

  t.deepEqual(await database.listMetadata(), {
    name: {
      a: 'b',
    },
  })

  t.deepEqual(await database.getMetadata('name'), {
    a: 'b',
  })
})

test('versions', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.deepEqual(await database.listVersions('name'), undefined)

  await database.putVersion('name', '1.0.0', {
    a: 'b',
  })

  t.deepEqual(await database.listVersions('name'), {
    '1.0.0': {
      a: 'b',
    },
  })

  t.deepEqual(await database.getVersion('name', '1.0.0'), {
    a: 'b',
  })
})
