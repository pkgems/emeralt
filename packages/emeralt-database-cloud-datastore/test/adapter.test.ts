import test from 'ava'
import { DatastoreAdapter } from '../src/adapter'

const adapter = new DatastoreAdapter()
const pkgs = [{ name: 'test' }, { name: 'test-2' }]

test.before(async (t) => {
  await adapter.dropAll(['packages'])

  t.pass()
})

test.after.always(async (t) => {
  await adapter.dropAll(['packages'])

  t.pass()
})

test.serial('set', async (t) => {
  await adapter.set(['packages', 'test'], pkgs[0])

  t.pass()
})

test.serial('get', async (t) => {
  t.deepEqual(await adapter.get(['packages', 'test']), pkgs[0])
})

test.serial('list', async (t) => {
  t.deepEqual(await adapter.list(['packages']), [pkgs[0]])
})

test.serial('exists', async (t) => {
  t.deepEqual(await adapter.exists(['packages', 'test']), true)
  t.deepEqual(await adapter.exists(['packages', 'test-nonexistent']), false)
})

test.serial('set nested', async (t) => {
  await adapter.set(['packages', 'test', 'versions', '1.0.0'], pkgs[1])

  t.pass()
})

test.serial('get nested', async (t) => {
  t.deepEqual(
    await adapter.get(['packages', 'test', 'versions', '1.0.0']),
    pkgs[1],
  )
})

test.serial('list nested', async (t) => {
  t.deepEqual(await adapter.list(['packages', 'test', 'versions']), [pkgs[1]])
})

test.serial('exists nested', async (t) => {
  t.deepEqual(
    await adapter.exists(['packages', 'test', 'versions', '1.0.0']),
    true,
  )

  t.deepEqual(
    await adapter.exists(['packages', 'test', 'versions', '2.0.0']),
    false,
  )
})
