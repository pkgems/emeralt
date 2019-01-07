import test from 'ava'
import { exec, getAddress } from '@test/utils'
import { createMockServer } from '@test/mocks'

test('ping', async (t) => {
  const { server } = createMockServer()

  const ping = await exec(`npm ping --registry ${getAddress(server)}`)

  t.is(ping.code, 0)
  t.is(ping.stdout, 'Ping success: {}\n')

  t.pass()
})
