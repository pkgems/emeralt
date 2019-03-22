import { createTest } from '../utils/test'

const test = createTest({
  serverConfig: {
    endpoints: {
      ping: false,
    },
  },
})

test('disable endpoint', async (t) => {
  const res = await t.context.http.get('/-/ping')

  t.is(res.status, 404)
})
