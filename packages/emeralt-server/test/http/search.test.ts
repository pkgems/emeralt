import test from 'ava'
import supertest from 'supertest'
import { RegistrySearchEndpoint } from '@emeralt/types'
import { createEmeraltServerMock } from 'test/fixtures'

test('search', async (t) => {
  const { server } = createEmeraltServerMock()

  const { status, body } = await supertest(server).get(
    RegistrySearchEndpoint,
  )

  t.is(status, 200)
  t.deepEqual(body, {
    objects: [],
    total: 0,
    time: body.time,
  })
})
