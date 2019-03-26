import { test } from '../../../test/utils'
import { EmeraltAuthInMemory } from '../src'

test<typeof EmeraltAuthInMemory>('provide users', async (t, authc) => {
  // @ts-ignore
  const auth = await authc({
    users: { tester: 'tester' },
  })({})

  t.true(auth.comparePassword('tester', 'tester'))
  t.false(auth.comparePassword('tester', 'wrong'))
})

test<typeof EmeraltAuthInMemory>('canUser', async (t, authc) => {
  // @ts-ignore
  const auth = await authc({
    users: { tester: 'tester-pass' },
  })(
    {},
    {
      // @ts-ignore
      getMetadata: () => ({
        _owner: 'tester',
      }),
    },
  )

  t.true(await auth.canUser('tester', 'get', 'some-package'))
  t.true(await auth.canUser('tester', 'publish', 'some-package'))

  // @ts-ignore
  const auth2 = await authc({
    users: { tester: 'tester-pass' },
  })(
    {},
    {
      // @ts-ignore
      getMetadata: () => ({
        _owner: 'other_user', // important
      }),
    },
  )

  t.false(await auth2.canUser('tester', 'publish', 'some-package'))
})
