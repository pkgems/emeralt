import test from 'ava'
import { getAddress } from '@/get-address'
import { createServer } from 'http'

test('getAddress', (t) => {
  const server = createServer().listen('1234')

  t.is(getAddress(server), 'http://localhost:1234')

  server.close()
})
