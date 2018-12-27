import test from 'ava'
import jwt from 'jsonwebtoken'
import { EmeraltAuthInMemory } from '../src'

const usersMock = new Map([['username', 'password']])

test('[init]', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
  }).initialize()

  t.deepEqual(auth.users, new Map())
})

test('[init] with encryption', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: true,
  }).initialize()

  t.deepEqual(auth.users, new Map())
})

test('[init] with users', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
    users: usersMock,
  }).initialize()

  t.deepEqual(auth.users, usersMock)
})

test('[init] with users and encryption', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: true,
    users: usersMock,
  }).initialize()

  t.deepEqual(auth.users.keys(), usersMock.keys())
  t.notDeepEqual(auth.users.values(), usersMock.values())

  t.pass()
})

test('[addUser]', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
  }).initialize()

  t.true(await auth.addUser('username', 'password'))

  t.is([...auth.users].length, 1)
  t.is(auth.users.get('username'), 'password')
})

test('[addUser] reject duplicate', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
  }).initialize()

  t.true(await auth.addUser('username', 'password'))
  t.false(await auth.addUser('username', 'password'))
})

test('[addUser] with encryption', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: true,
  }).initialize()

  t.true(await auth.addUser('username', 'password'))

  t.is([...auth.users].length, 1)
  t.not(auth.users.get('username'), 'password')
})

test('[removeUser]', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
  }).initialize()

  t.true(await auth.addUser('tester', 'tester'))
  t.true(await auth.removeUser('tester'))

  t.deepEqual(auth.users, new Map([]))
})

test('[removeUser] unexistent user', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
  }).initialize()

  t.false(await auth.removeUser('tester'))

  t.deepEqual(auth.users, new Map([]))
})

test('[authenticate]', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
    users: new Map([['username', 'password']]),
  }).initialize()

  t.truthy(await auth.authenticate('username', 'password'))
})

test('[authenticate] with encryption', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: true,
    users: new Map([['username', 'password']]),
  }).initialize()

  t.truthy(await auth.authenticate('username', 'password'))
})

test('[authenticate] unexistend user', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
  }).initialize()

  t.falsy(await auth.authenticate('username', 'password'))
})

test('[authenticate] unexistend user with encryption', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: true,
  }).initialize()

  t.falsy(await auth.authenticate('username', 'password'))
})

test('[authenticate] wrong password', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: false,
    users: new Map([['username', 'password']]),
  }).initialize()

  t.falsy(await auth.authenticate('username', 'wrong-password'))
})

test('[authenticate] wrong password with encryption', async (t) => {
  const auth = await new EmeraltAuthInMemory({
    encrypt: true,
    users: new Map([['username', 'password']]),
  }).initialize()

  t.falsy(await auth.authenticate('username', 'wrong-password'))
})
