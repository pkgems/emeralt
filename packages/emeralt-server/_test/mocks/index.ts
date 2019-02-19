import { createMockServer } from './mock-server'
import { createMockClient } from './mock-client'
import { TEmeraltServerConfig, Optional } from '@emeralt/types'

type Configs = {
  serverConfig?: Optional<TEmeraltServerConfig>
  clientConfig?: Optional<{}>
}

export const createMocks = async ({
  serverConfig,
  clientConfig,
}: Configs = {}) => ({
  ...(await createMockServer(serverConfig)),
  ...(await createMockClient(clientConfig)),
})

export { createMockServer } from './mock-server'
export { createMockClient } from './mock-client'
