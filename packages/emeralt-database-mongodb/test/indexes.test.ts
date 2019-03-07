import { defaultOptions } from '../src'
import { MongoClient } from 'mongodb'
import { test } from '../../../test/utils'
import { IEmeraltDatabase } from '@emeralt/types'

const connect = () =>
  new MongoClient(defaultOptions.uri, {
    useNewUrlParser: true,
  })
    .connect()
    .then((t) => t.db())

test<IEmeraltDatabase>('indexing', async (t, dbc) => {
  const db = await connect()

  await dbc({
    indexing: {
      options: {
        background: false,
      },
    },
  })({})

  t.true(await db.collection('versions').indexExists('name_1'))
  t.true(await db.collection('metadatas').indexExists('name_1'))
})

test<IEmeraltDatabase>('indexing disable metadatas', async (t, dbc) => {
  const db = await connect()

  await dbc({
    indexing: {
      versions: false,
      options: {
        background: false,
      },
    },
  })({})

  t.false(await db.collection('versions').indexExists('name_1'))
  t.true(await db.collection('metadatas').indexExists('name_1'))
})

test<IEmeraltDatabase>('indexing disable', async (t, dbc) => {
  const db = await connect()

  await dbc({
    indexing: false,
  })({})

  t.false(await db.collection('versions').indexExists('name_1'))
  t.false(await db.collection('metadatas').indexExists('name_1'))
})

// test.serial('indexes', async (t) => {

//   // @ts-ignore
//   await EmeraltDatabaseMongoDB({
//     indexing: {
//       metadatas: false,
//       versions: false,
//     },
//   })({})

//   t.true(await db.collection('metadata').indexExists('name_1'))
//   t.true(await db.collection('versions').indexExists('name_1'))

//   db.dropDatabase()
// })
