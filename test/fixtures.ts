import { TMetadata, TVersion, TUser } from '@emeralt/types'

export const user: TUser = {
  username: 'tester',
  password: '7wvFQefb',
}

export const metadata: TMetadata = {
  name: '@test/test',
  version: '1.0.0',
  author: 'tester',
  main: 'index.js',
  _owner: 'tester',
  'dist-tags': {
    latest: '1.0.0',
  },
}

export const version: TVersion = {
  name: 'test',
  version: '1.0.0',
  main: 'index.js',
  author: 'tester',
  _owner: 'tester',
}
