import test from 'ava'
import { hash, compare } from '../src/crypto'

test('hash and compare', async (t) => {
  const rawString = 'test-string'

  const hashedString = await hash(rawString)

  t.true(await compare(rawString, hashedString))
  t.false(await compare('false-test-string', hashedString))
})
