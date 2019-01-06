import test from 'ava'
import { EmeraltAuthInMemory } from '../src'

const usersMock = {
  username: 'password',
}

test('[init]', async (t) => {
  const auth = await new EmeraltAuthInMemory()

  t.deepEqual(auth.users, new Map())
})

test('[init] with users', async (t) => {
  const auth = new EmeraltAuthInMemory({
    users: usersMock,
  })

  t.is([...auth.users].length, 1)
  t.is(
    auth.users.get('username'),
    Buffer.from('password').toString('base64'),
  )
})

test('[addUser]', async (t) => {
  const auth = await new EmeraltAuthInMemory()

  t.true(await auth.addUser('username', 'password'))

  t.is([...auth.users].length, 1)
  t.is(
    auth.users.get('username'),
    Buffer.from('password').toString('base64'),
  )
})

test('[addUser] reject duplicate', async (t) => {
  const auth = await new EmeraltAuthInMemory()

  t.true(await auth.addUser('username', 'password'))
  t.false(await auth.addUser('username', 'password'))
})

test('[removeUser]', async (t) => {
  const auth = await new EmeraltAuthInMemory()

  t.true(await auth.addUser('username', 'password'))
  t.true(await auth.removeUser('username'))

  t.deepEqual(auth.users, new Map([]))
})

test('[removeUser] unexistent user', async (t) => {
  const auth = await new EmeraltAuthInMemory()

  t.false(await auth.removeUser('tester'))

  t.deepEqual(auth.users, new Map([]))
})

test('[authenticate]', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    users: usersMock,
  })

  t.true(await auth.comparePassword('username', 'password'))
})

test('[authenticate] unexistend user', async (t) => {
  const auth = await new EmeraltAuthInMemory()

  t.false(await auth.comparePassword('username', 'password'))
})

test('[authenticate] wrong password', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    users: usersMock,
  })

  t.false(await auth.comparePassword('username', 'wrong-password'))
})
