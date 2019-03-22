import { IEmeraltStorage } from '@emeralt/types'

import { WriteStream, ReadStream } from 'fs'
import { PassThrough } from 'stream'

import { test } from './utils'

const writeToStream = (data: string, stream: WriteStream) =>
  new Promise((resolve, reject) => {
    stream.on('finish', resolve).on('error', reject)

    const buf = Buffer.from(data)

    stream.write(buf)
    stream.end()
  })

const readFromStream = (stream: ReadStream) =>
  new Promise((resolve, reject) => {
    let bufs = []

    stream.pipe(
      new PassThrough()
        .on('data', (buf) => bufs.push(buf))
        .on('end', () => resolve(Buffer.concat(bufs).toString()))
        .on('error', reject),
    )
  })

test<IEmeraltStorage>('storage', async (t, createStorage) => {
  // @ts-ignore
  const storage = await createStorage({})({})
  const data = 'test'

  t.log('healthz')
  t.deepEqual(await storage.healthz(), { ok: true })

  t.log('createWriteStream')
  await writeToStream(data, await storage.createWriteStream('test', '1.0.0'))

  t.log('createReadableStream')
  t.is(
    await readFromStream(await storage.createReadStream('test', '1.0.0')),
    data,
  )
})
