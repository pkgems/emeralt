import ava, { ExecutionContext } from 'ava'
import { resolve } from 'path'
import { IEmeraltDatabase, CEmeraltDatabase } from '@emeralt/types'

const createTestRunner = (path) => (
  message,
  cb: (t: ExecutionContext, c: CEmeraltDatabase) => {},
) => {
  const Database = Object.values(require(path))[0] as IEmeraltDatabase

  return ava.serial(message, async (t) => {
    // @ts-ignore
    const database = await Database()({})

    try {
      await cb(t, database)
    } catch (error) {
      throw error
    } finally {
      database.dropDatabase && (await database.dropDatabase())
    }
  })
}

export const makeTest = (test: ReturnType<typeof createTestRunner>) => {
  // test('init', async (t) => {
  //   // @ts-ignore
  //   const database = await Database({})({})

  //   t.truthy(database.listKeys)
  //   t.truthy(database.getKey)
  //   t.truthy(database.setKey)
  //   t.truthy(database.updateKey)
  //   t.truthy(database.deleteKey)
  // })

  test('getKey [& setKey]', async (t, database) => {
    t.true(
      await database.setKey(['metadata', 'pkg-1'], {
        a: 'a',
      }),
    )

    t.deepEqual(await database.getKey(['metadata', 'pkg-1']), { a: 'a' })
  })

  test('hasKey [& setKey]', async (t, database) => {
    t.false(await database.hasKey(['metadata', 'pkg-1']))
    t.false(await database.hasKey(['metadata', 'pkg-1', 'a']))
    t.true(await database.setKey(['metadata', 'pkg-1'], { a: 'b' }))
    t.true(await database.hasKey(['metadata', 'pkg-1']))
    t.true(await database.hasKey(['metadata', 'pkg-1', 'a']))
  })

  test('listKeys [& setKey]', async (t, database) => {
    t.true(await database.setKey(['metadata', 'pkg-1'], { a: 'a' }))

    t.deepEqual(await database.listKeys(['metadata']), ['pkg-1'])
  })

  test('updateKey [& setKey, getKey]', async (t, database) => {
    t.false(await database.updateKey(['metadata', 'pkg-1'], { a: 'b', c: 'd' }))

    await database.setKey(['metadata', 'pkg-1'], { a: 'a' })

    t.true(await database.updateKey(['metadata', 'pkg-1'], { a: 'b', c: 'd' }))

    t.deepEqual(await database.getKey(['metadata', 'pkg-1']), {
      a: 'b',
      c: 'd',
    })

    t.false(await database.updateKey(['metadata', 'pkg-2'], { a: 'b' }))
  })

  test('deleteKey [& setKey, getKey]', async (t, database) => {
    await database.setKey(['metadata', 'pkg-1'], { a: 'a', b: 'b' })

    t.false(await database.deleteKey(['metadata', 'pkg-1', 'c']))
    t.true(await database.deleteKey(['metadata', 'pkg-1', 'b']))

    t.deepEqual(await database.getKey(['metadata', 'pkg-1']), {
      a: 'a',
    })

    t.true(await database.deleteKey(['metadata', 'pkg-1']))

    t.falsy(await database.getKey(['metadata', 'pkg-1']))
  })
}

makeTest(createTestRunner(resolve(__dirname, process.cwd(), 'src/index.ts')))
