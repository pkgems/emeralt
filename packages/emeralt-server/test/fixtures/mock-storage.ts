import { IEmeraltStorage } from '@emeralt/types'
import sinon from 'sinon'

export class MockStorage implements IEmeraltStorage {
  getTarball = sinon.fake(
    (name: string): void | string => {
      throw new Error('Method not implemented.')
    },
  )

  putTarball = sinon.fake(
    (name: string, tarball: string): boolean => {
      throw new Error('Method not implemented.')
    },
  )
}
