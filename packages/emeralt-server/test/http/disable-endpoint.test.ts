import { createTest } from '../utils/test'

const test = createTest({
  serverConfig: {
    endpoints: {
      ping: false,
    },
  },
})

test('disable endpoint', async (t) => {
  await t.throwsAsync(t.context.http.get('/-/ping'))
})
