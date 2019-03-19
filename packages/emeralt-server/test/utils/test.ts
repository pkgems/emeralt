import { Unpack, TEmeraltServerConfig } from '@emeralt/types'

import { TestInterface } from 'ava'
import supertest from 'supertest'

import { createTestServer } from './server'
import { createTestFixtures } from './fixtures'

interface Options {
  serverConfig?: TEmeraltServerConfig
}

export const createTest = (options: Options = {}) => {
  const test = require('ava') as TestInterface<{
    server: Unpack<ReturnType<typeof createTestServer>>
    fixtures: ReturnType<typeof createTestFixtures>
    http: ReturnType<typeof supertest>
  }>

  test.before(async (t) => {
    t.context.fixtures = createTestFixtures()
    t.context.server = await createTestServer(
      options.serverConfig,
      t.context.fixtures.users,
    )
    t.context.http = supertest(t.context.server)

    t.pass()
  })

  return test
}
