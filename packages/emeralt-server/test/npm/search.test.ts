import test from 'ava'
import { exec, getAddress } from '../utils'
import { createEmeraltServerMock } from 'test/fixtures'

test('search', async (t) => {
  const { server } = createEmeraltServerMock()

  const search = await exec(
    `npm search react --registry ${getAddress(server)}`,
  )

  t.is(search.code, 0)
  t.is(search.stdout, 'No matches found for "react"\n')

  t.pass()
})
