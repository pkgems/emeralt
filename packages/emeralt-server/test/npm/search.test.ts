import test from 'ava'
import { createEmeraltServer } from '@/index'
import { exec, getAddress } from '../utils'

test('search', async (t) => {
  const server = createEmeraltServer().listen()

  const search = await exec(`npm search react --registry ${getAddress(server)}`)

  t.is(search.code, 0)
  t.is(search.stdout, 'No matches found for "react"\n')

  t.pass()
})
