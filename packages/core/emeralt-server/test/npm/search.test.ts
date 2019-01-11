import test from 'ava'
import { execCmd } from '@emeralt/utils'
import { createMockServer } from '@test/mocks'

test('search', async (t) => {
  const { address } = createMockServer()

  const search = await execCmd(`npm search react --registry ${address}`)

  t.is(search.code, 0)
  t.is(search.stdout, 'No matches found for "react"\n')

  t.pass()
})
