import { createMockServer } from './mock-server'
import { createMockClient } from './mock-client'

export const createMocks = async () => ({
  ...(await createMockServer()),
  ...(await createMockClient()),
})
