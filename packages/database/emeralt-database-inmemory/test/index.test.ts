import test from 'ava'
import { EmeraltDatabaseInMemory } from '@/index'

test('init', (t) => {
  const database = new EmeraltDatabaseInMemory()

  t.true(database instanceof EmeraltDatabaseInMemory)
})

test('metadata', async (t) => {
  const database = new EmeraltDatabaseInMemory()

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
  const database = new EmeraltDatabaseInMemory()

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
