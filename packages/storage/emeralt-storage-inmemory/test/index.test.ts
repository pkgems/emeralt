import test from 'ava'
import { EmeraltStorageInMemory } from '@/index'
import { Readable } from 'stream'

test('init', (t) => {
  const storage = new EmeraltStorageInMemory()

  t.true(storage instanceof EmeraltStorageInMemory)
})

test('tarball', async (t) => {
  const storage = new EmeraltStorageInMemory()

  t.is(await storage.getTarball('name', '1.0.0'), undefined)

  await storage.putTarball('name', '1.0.0', Buffer.from('asd'))

  t.true((await storage.getTarball('name', '1.0.0')) instanceof Readable)
})
