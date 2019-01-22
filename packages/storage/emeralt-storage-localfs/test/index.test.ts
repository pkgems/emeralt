import test from 'ava'
import { EmeraltStorageLocalFS } from '@/index'
import { Readable } from 'stream'
import { resolve } from 'path'

test('init', async (t) => {
  // @ts-ignore
  const storage = await EmeraltStorageLocalFS({
    path: resolve(__dirname, '../', 'node_modules', '.storage'),
  })({})

  t.truthy(storage.getTarball)
  t.truthy(storage.putTarball)
})

test('tarball', async (t) => {
  // @ts-ignore
  const storage = await EmeraltStorageLocalFS({
    path: resolve(__dirname, '../', 'node_modules', '.storage'),
  })({})

  t.is(await storage.getTarball('name', '1.0.0'), undefined)

  await storage.putTarball('name', '1.0.0', Buffer.from('asd'))

  t.true((await storage.getTarball('name', '1.0.0')) instanceof Readable)
})
