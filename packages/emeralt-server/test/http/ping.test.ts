import { createTest } from '../utils/test'

const test = createTest()

test('ping', async (t) => {
  const res = await t.context.http.get('/-/ping')

  t.deepEqual(res.status, 200)
  t.deepEqual(res.body, {})
})
