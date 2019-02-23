import { IEmeraltStorage } from '@emeralt/types'

import { test } from './utils'
import { Readable } from 'stream'

const readableToBuffer = (readable: Readable) =>
  new Promise<Buffer>((resolve, reject) => {
    const bufs = []

    readable
      .on('data', (d) => bufs.push(d))
      .on('end', () => resolve(Buffer.concat(bufs)))
      .on('error', reject)
  })

test<IEmeraltStorage>('storage', async (t, createStorage) => {
  // @ts-ignore
  const storage = await createStorage({})({})
  const data = 'test'

  t.log('healthz')
  t.deepEqual(await storage.healthz(), { ok: true })

  t.log('putTarball')
  await storage.putTarball('test', '1.0.0', Buffer.from(data))

  t.log('getTarball')
  const readable = await storage.getTarball('test', '1.0.0')
  t.true(readable instanceof Readable)

  const newData = await readableToBuffer(
    await storage.getTarball('test', '1.0.0'),
  ).then((t) => t.toString())

  t.is(newData, data)
})
