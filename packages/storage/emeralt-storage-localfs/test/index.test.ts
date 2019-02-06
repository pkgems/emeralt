import test from 'ava'
import { EmeraltStorageLocalFS } from '@/index'
import { Readable } from 'stream'
import { resolve } from 'path'
import { remove } from 'fs-extra'

const storagePath = resolve(__dirname, '../', 'node_modules', '.storage')

test('init', async (t) => {
  // @ts-ignore
  const storage = await EmeraltStorageLocalFS({
    path: storagePath,
  })({})

  t.truthy(storage.getTarball)
  t.truthy(storage.putTarball)
})

test('tarball', async (t) => {
  // @ts-ignore
  const storage = await EmeraltStorageLocalFS({
    path: storagePath,
  })({})

  await remove(storagePath)

  t.is(await storage.getTarball('name', '1.0.0'), undefined)

  await storage.putTarball('name', '1.0.0', Buffer.from('asd'))

  t.true((await storage.getTarball('name', '1.0.0')) instanceof Readable)

  await remove(storagePath)
})
