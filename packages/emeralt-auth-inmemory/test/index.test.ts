import { test } from '../../../test/utils'
import { EmeraltAuthInMemory, User } from '../src'

const users: User[] = [
  {
    username: 'tester',
    password: 'tester',
  },
  {
    username: 'tester2',
    password: 'tester2',
  },
]

test<typeof EmeraltAuthInMemory>('provide users', async (t, authc) => {
  // @ts-ignore
  const auth = await authc({ users })({})

  t.true(auth.comparePassword(users[0].username, users[0].password))
  t.false(auth.comparePassword(users[0], 'wrong'))
})

test<typeof EmeraltAuthInMemory>('canUser', async (t, authc) => {
  // @ts-ignore
  const auth = await authc({ users })(
    {},
    {
      // @ts-ignore
      getMetadata: () => ({
        // emulate package with owner users[0]
        _owner: users[0].username,
      }),
    },
  )

  // owner
  t.true(await auth.canUser(users[0].username, 'get', 'some-package'))
  t.true(await auth.canUser(users[0].username, 'publish', 'some-package'))

  // other user
  t.true(await auth.canUser(users[1].username, 'get', 'some-package'))
  t.false(await auth.canUser(users[1].username, 'publish', 'some-package'))
})
