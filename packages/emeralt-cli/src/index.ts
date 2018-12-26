#!/usr/bin/env node

import { createEmeraltServer } from '@emeralt/server'

createEmeraltServer({
  config: {
    logLevel: 'dev',
  },
}).listen(8080, () => {
  console.log('Emeralt is listening at 8080...')
})
