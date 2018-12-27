import test from 'ava'
import { exec, getAddress } from '../utils'
import { createEmeraltServerMock } from 'test/fixtures'

test('ping', async (t) => {
  const { server } = createEmeraltServerMock()

  const ping = await exec(`npm ping --registry ${getAddress(server)}`)

  t.is(ping.code, 0)
  t.is(ping.stdout, 'Ping success: {}\n')

  t.pass()
})
