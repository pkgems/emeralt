#!/usr/bin/env node

import { createEmeraltServer } from '@emeralt/server'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'

createEmeraltServer({
  config: {
    logLevel: 'dev',
  },
  storage: new class Storage {}(),
  auth: new EmeraltAuthInMemory(),
  plugins: [],
}).listen(8080, () => {
  console.log('Emeralt is listening at 8080...')
})
