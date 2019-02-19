import { IEmeraltAuth } from '@emeralt/types'

import { test } from './utils'
import { user } from './fixtures'

test<IEmeraltAuth>('users', async (t, authc) => {
  // @ts-ignore
  const auth = await authc({})({})

  t.log('no user')
  await t.false(await auth.hasUser(user.username))
  await t.false(await auth.comparePassword(user.username, user.password))
  await t.false(await auth.comparePassword(user.username, '123123'))

  t.log('add user')
  await auth.putUser(user.username, user.password)

  t.log('with user')
  await t.true(await auth.hasUser(user.username))
  await t.true(await auth.comparePassword(user.username, user.password))
  await t.false(await auth.comparePassword(user.username, '123456'))

  await auth.dropData()
})
