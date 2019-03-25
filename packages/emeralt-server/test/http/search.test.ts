import { createTest } from '../utils/test'

const test = createTest()

test('search', async (t) => {
  const res = await t.context.http.get('/-/v1/search')

  t.deepEqual(res.status, 200)
})
