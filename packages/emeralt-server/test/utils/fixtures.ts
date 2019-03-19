import jwt from 'jsonwebtoken'
import ssri from 'ssri'

import { TUser, TMetadata } from '@emeralt/types'

export const createTestFixtures = (): {
  users: TUser[]
  packages: TMetadata[]
  tokens: string[]
} => ({
  users: [1, 2].map((i) => ({
    username: `user_${i}`,
    password: `password_${i}`,
    email: `user_${i}@emeralt.org`,
  })),

  tokens: [1, 2].map((i) => jwt.sign({ username: `user_${i}` }, 'secret')),

  // @ts-ignore
  packages: [1, 2].map((i) => ({
    name: `@test/package-${i}`,
    version: `1.0.0`,
    author: 'stackdumper',

    versions: {
      '1.0.0': {
        name: `@test/package-${i}`,
        version: `1.0.0`,
        author: 'stackdumper',

        dist: {
          shasum: '',
          tarball: '',
          integrity: ssri.fromData('abc').toString(),
        },
      },
    },

    _attachments: {
      [`@test/package-${1}-1.0.0.tar.gz`]: {
        content_type: 'application/octet-stream',
        data: Buffer.from('abc').toString('base64'),
      },
    },
  })),
})
