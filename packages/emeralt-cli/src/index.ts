#!/usr/bin/env node

import chalk from 'chalk'
import { createEmeraltServer } from '@emeralt/server'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'

createEmeraltServer({
  config: {
    logLevel: 'dev',
  },
  storage: new class Storage {}(),
  auth: new EmeraltAuthInMemory({
    users: {
      emeralt: 'emeralt',
    },
  }),
  plugins: [],
}).listen(8080, () => {
  console.log(
    chalk.bold.greenBright('Emeralt is listening at 8080...'),
  )
  console.log('Default user:')
  console.log(`Username: ${chalk.greenBright('emeralt')}`)
  console.log(`Password: ${chalk.greenBright('emeralt')}`)
})
