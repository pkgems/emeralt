import chalk from 'chalk'
import { homedir } from 'os'
import { resolve } from 'path'
import { createEmeraltServer } from '@emeralt/server'
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltDatabaseLocalFS } from '@emeralt/database-localfs'
import { EmeraltStorageLocalFS } from '@emeralt/storage-localfs'

createEmeraltServer({
  auth: EmeraltAuthInMemory({
    users: {
      emeralt: 'emeralt',
    },
  }),
  database: EmeraltDatabaseLocalFS({
    path: resolve(homedir(), '.emeralt'),
  }),
  storage: EmeraltStorageLocalFS({
    path: resolve(homedir(), '.emeralt'),
  }),
}).then((server) => {
  server.listen(8080, () => {
    console.log(chalk.bold.greenBright('Emeralt is listening at 8080...'))
    console.log('Default user:')
    console.log(`Username: ${chalk.greenBright('emeralt')}`)
    console.log(`Password: ${chalk.greenBright('emeralt')}`)
  })
})
