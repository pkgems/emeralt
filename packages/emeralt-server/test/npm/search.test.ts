import test from 'ava'
import { createEmeraltServer } from '@/index'
import { MockStorage, MockAuth } from '../fixtures'
import { exec, getAddress } from '../utils'

test('search', async (t) => {
  const server = createEmeraltServer({
    config: {},
    storage: new MockStorage(),
    auth: new MockAuth(),
    plugins: [],
  }).listen()

  const search = await exec(`npm search react --registry ${getAddress(server)}`)

  t.is(search.code, 0)
  t.is(search.stdout, 'No matches found for "react"\n')

  t.pass()
})
