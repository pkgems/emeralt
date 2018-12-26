import test from 'ava'
import jwt from 'jsonwebtoken'
import { EmeraltAuthInMemory } from '../src'

test('init', async (t) => {
  const auth = new EmeraltAuthInMemory()
  t.deepEqual(auth.users, new Map())
})

test('authenticate', async (t) => {
  const auth = new EmeraltAuthInMemory()

  t.is(await auth.authenticate('tester', 'tester'), null)

  auth.addUser('tester', 'tester')
  t.is(
    await auth.authenticate('tester', 'tester'),
    jwt.sign(
      {
        username: 'tester',
      },
      auth.secret,
    ),
  )
})

test('addUser', async (t) => {
  const auth = new EmeraltAuthInMemory()

  auth.addUser('tester', 'tester')

  t.deepEqual(auth.users, new Map([['tester', 'tester']]))
})

test('removeUser', async (t) => {
  const auth = new EmeraltAuthInMemory()

  auth.addUser('tester', 'tester')
  auth.removeUser('tester')

  t.deepEqual(auth.users, new Map([]))
})
