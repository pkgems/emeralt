import test from 'ava'
import { encrypt, compare } from '../src/crypto'

test('encrypt and compare', async (t) => {
  const testString = 'test-string'

  const hash = await encrypt(testString)

  t.true(await compare(hash, testString))
  t.false(await compare(hash, 'false-test-string'))
})
