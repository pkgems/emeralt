import { createTest } from '../utils/test'

const test = createTest()

test('login', async (t) => {
  const res = await t.context.http.post('/-/v1/login')

  t.deepEqual(res.status, 401)
  t.deepEqual(res.body, { error: '' })
})
