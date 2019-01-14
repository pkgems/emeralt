import test from 'ava'
import { EmeraltDatabaseInMemory } from '@/index'

test('init', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.truthy(database.listKeys)
  t.truthy(database.getKey)
  t.truthy(database.setKey)
  t.truthy(database.updateKey)
  t.truthy(database.deleteKey)
})

test('getKey [& setKey]', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.true(
    database.setKey(['metadata', 'pkg-1'], {
      a: 'a',
    }),
  )

  t.deepEqual(database.getKey(['metadata', 'pkg-1']), { a: 'a' })
})

test('hasKey [& setKey]', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.false(database.hasKey(['metadata', 'pkg-1']))
  t.true(database.setKey(['metadata', 'pkg-1'], {}))
  t.true(database.hasKey(['metadata', 'pkg-1']))
})

test('listKeys [& setKey]', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.true(database.setKey(['metadata', 'pkg-1'], { a: 'a' }))

  t.deepEqual(database.listKeys(['metadata']), ['pkg-1'])
})

test('updateKey [& setKey, getKey]', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  t.false(database.updateKey(['metadata', 'pkg-1'], { a: 'b', c: 'd' }))

  database.setKey(['metadata', 'pkg-1'], { a: 'a' })

  t.true(database.updateKey(['metadata', 'pkg-1'], { a: 'b', c: 'd' }))

  t.deepEqual(database.getKey(['metadata', 'pkg-1']), { a: 'b', c: 'd' })

  t.false(database.updateKey(['metadata', 'pkg-2'], { a: 'b' }))
})

test('deleteKey [& setKey, getKey]', async (t) => {
  // @ts-ignore
  const database = await EmeraltDatabaseInMemory({})({})

  database.setKey(['metadata', 'pkg-1'], { a: 'a' })
  t.true(database.deleteKey(['metadata', 'pkg-1']))

  t.deepEqual(database.getKey(['metadata', 'pkg-1']), undefined)
})
