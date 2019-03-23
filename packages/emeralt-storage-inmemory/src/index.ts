import { IEmeraltStorage } from '@emeralt/types'
import { ReadStream } from 'fs'
import { path, assocPath } from 'ramda'
import { PassThrough } from 'stream'

// @ts-ignore
export const EmeraltStorageInMemory: IEmeraltStorage = () => () => {
  let storage = {}

  return {
    createReadStream: (name, version) => {
      const buffer = path([name, version], storage)

      if (buffer) {
        const rs = new PassThrough()

        rs.push(buffer)
        rs.push(null)

        return rs
      } else {
        return undefined
      }
    },

    createWriteStream: (name, version) => {
      const bufs = []

      const stream = new PassThrough()
        .on('data', (data) => {
          bufs.push(data)
        })
        .on('end', () => {
          storage = assocPath([name, version], Buffer.concat(bufs), storage)

          stream.end()
        })

      return stream
    },

    dropData() {
      storage = {}
    },

    healthz() {
      return { ok: true }
    },
  }
}
