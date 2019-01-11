import test from 'ava'
import { execCmd } from '@emeralt/utils'
import { createMockServer } from '@test/mocks'

test('ping', async (t) => {
  const { address } = createMockServer()

  const ping = await execCmd(`npm ping --registry ${address}`)

  t.is(ping.code, 0)
  t.is(ping.stdout, 'Ping success: {}\n')

  t.pass()
})
