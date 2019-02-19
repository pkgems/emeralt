import test from 'ava'
import { adduser } from './shortcuts'
import { createFixtures } from './fixtures'

test('disable adduser endpoint', async (t) => {
  const fixtures = await createFixtures({
    serverConfig: {
      endpoints: {
        adduser: false,
      },
    },
  })

  await t.throwsAsync(adduser(fixtures, fixtures.users[0]))
})
