import { createEmeraltServer } from '@/server'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'

export const createMockServer = () => {
  const auth = new EmeraltAuthInMemory()
  const storage = new EmeraltStorageInMemory()
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
