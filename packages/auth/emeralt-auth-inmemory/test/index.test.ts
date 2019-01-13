import test from 'ava'
import { EmeraltAuthInMemory } from '@/index'

const usersMock = {
  username: 'password',
}

test('[init]', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({})({})

  t.truthy(auth.addUser)
  t.truthy(auth.comparePassword)
  t.truthy(auth.removeUser)
})

test('[init] with users', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({ users: usersMock })({})

  t.true(await auth.comparePassword('username', 'password'))
})

test('[addUser]', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({})({})

  t.true(await auth.addUser('username', 'password'))
  t.true(await auth.comparePassword('username', 'password'))
})

test('[addUser] reject duplicate', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({})({})

  t.true(await auth.addUser('username', 'password'))
  t.false(await auth.addUser('username', 'password'))
})

test('[removeUser]', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({})({})

  t.true(await auth.addUser('username', 'password'))
  t.true(await auth.removeUser('username'))

  t.false(await auth.removeUser('username'))
  t.false(await auth.comparePassword('username', 'password'))
})

test('[removeUser] unexistent user', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({})({})

  t.false(await auth.removeUser('tester'))
})

test('[comparePassword]', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({ users: usersMock })({})

  t.true(await auth.comparePassword('username', 'password'))
})

test('[comparePassword] unexistend user', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({})({})

  t.false(await auth.comparePassword('username', 'password'))
})

test('[comparePassword] wrong password', async (t) => {
  // @ts-ignore
  const auth = EmeraltAuthInMemory({ users: usersMock })({})

  t.false(await auth.comparePassword('username', 'wrong-password'))
})
