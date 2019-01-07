import test from 'ava'
import { exec, getAddress } from '@test/utils'
import { createMockServer } from '@test/mocks'

test('search', async (t) => {
  const { server } = createMockServer()

  const search = await exec(`npm search react --registry ${getAddress(server)}`)

  t.is(search.code, 0)
  t.is(search.stdout, 'No matches found for "react"\n')

  t.pass()
})
