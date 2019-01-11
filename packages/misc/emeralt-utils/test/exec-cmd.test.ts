import test from 'ava'
import { execCmd } from '@/exec-cmd'

test('interpolatePath', async (t) => {
  const { code, stdout, stderr } = await execCmd(`echo test`)

  t.is(code, 0)
  t.is(stdout, 'test\n')
  t.is(stderr, '')
})
