import test from 'ava'
import { createEmeraltServer } from '@/index'
import { exec, getAddress } from '../utils'

test('ping', async (t) => {
  const server = createEmeraltServer().listen()

  const ping = await exec(`npm ping --registry ${getAddress(server)}`)

  t.is(ping.code, 0)
  t.is(ping.stdout, 'Ping success: {}\n')

  t.pass()
})
