import { Unpack, TUser } from '@emeralt/types'
import { createFixtures } from '../fixtures'

export const adduser = (
  fixtures: Unpack<Unpack<typeof createFixtures>>,
  user?: TUser,
) =>
  fixtures.client('adduser')(
    async () => fixtures.address,
    async () => user || {},
  )
