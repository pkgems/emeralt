import test from 'ava'
import { EmeraltStorageInMemory } from '@/index'
import { Readable } from 'stream'

test('init', async (t) => {
  // @ts-ignore
  const storage = await EmeraltStorageInMemory({})({})

  t.truthy(storage.getTarball)
  t.truthy(storage.putTarball)
})

test('tarball', async (t) => {
  // @ts-ignore
  const storage = await EmeraltStorageInMemory({})({})

  t.is(await storage.getTarball('name', '1.0.0'), undefined)

  await storage.putTarball('name', '1.0.0', Buffer.from('asd'))

  t.true((await storage.getTarball('name', '1.0.0')) instanceof Readable)
})
