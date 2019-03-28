import test from 'ava'
import { DatastoreAdapter } from '../src/adapter'

test.serial('performance', async (t) => {
  const adapter = new DatastoreAdapter()
  const pkg = { name: 'test' }

  const test = async (
    title: string,
    cb: (iteration: number) => any,
    iterations: number,
  ) => {
    const start = Date.now()

    for (let i = 0; i < iterations; i += 1) {
      await cb(i)
    }

    t.log(title, (Date.now() - start) / iterations)
  }
  
  const iterations = 100

  await test('set', (i) => adapter.set(['packages', 'test'], pkg), iterations)
  await test('get', (i) => adapter.get(['packages', 'test']), iterations)
  await test('list', (i) => adapter.list(['packages']), iterations)

  await test(
    'set nested',
    (i) => adapter.set(['packages', 'test', 'versions', '1.0.0'], pkg),
    iterations,
  )
  await test(
    'get nested',
    (i) => adapter.get(['packages', 'test', 'versions', '1.0.0']),
    iterations,
  )
  await test(
    'list nested',
    (i) => adapter.list(['packages', 'test', 'versions']),
    iterations,
  )

  t.pass()
})
