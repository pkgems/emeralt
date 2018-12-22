#!/usr/bin/env node

import { createEmeraltServer } from '@emeralt/server'

class Storage {}
class Auth {}

createEmeraltServer({
  config: {},
  storage: new Storage(),
  auth: new Auth(),
  plugins: [],
}).listen(8080, () => {
  console.log('Emeralt is listening at 8080...')
})
