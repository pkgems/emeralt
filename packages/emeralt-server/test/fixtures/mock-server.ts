import { createEmeraltServer } from '@/server'
import { MockStorage } from './mock-storage'
import { MockAuth } from './mock-auth'

export const createEmeraltServerMock = () => {
  const auth = new MockAuth()
  const storage = new MockStorage()
  const plugins = []

  return {
    server: createEmeraltServer({
      config: {
        logLevel: 'silent',
      },
      storage,
      auth,
      plugins,
    }).listen(),
    storage,
    auth,
    plugins,
  }
}
