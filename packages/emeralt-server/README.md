# @emeralt/server
> Emeralt Node.js HTTP server module

### Install

Using npm:

```sh
npm install --save-dev @emeralt/server
```

or using yarn:

```sh
yarn add --dev @emeralt/server
```

### Usage

```ts
// import server 
import { createEmeraltServer } from '@emeralt/server'

// import plugins - auth, database and storage
import { EmeraltAuthInMemory } from '@emeralt/auth-inmemory'
import { EmeraltDatabaseInMemory } from '@emeralt/database-inmemory'
import { EmeraltStorageInMemory } from '@emeralt/storage-inmemory'

const config: TEmeraltServerConfig = {}

// create server
createEmeraltServer({
  config: config,
  auth: EmeraltAuthInMemory(),
  database: EmeraltDatabaseInMemory(),
  storage: EmeraltStorageInMemory(),
}).then((server) => {
  // listen on 8080
  server.listen(8080, () => {
    console.log('Listening on 8080')
  })
})
```

### Config

```ts
type TEmeraltServerConfig = {
  logLevel?: 'combined' | 'common' | 'dev' | 'short' | 'tiny' | 'silent'
  jwt?: {
    // secret to sign JWT tokens with
    secret?: string
  }
  // enable specific endpoint, defaults to true
  endpoints?: {
    ping?: boolean
    search?: boolean
    login?: boolean
    adduser?: boolean

    package?: {
      get?: boolean
      publish?: boolean
    }
  }
}
```

### Default Config

```ts
const emeraltServerDefaultConfig: TEmeraltServerConfig = {
  logLevel: 'dev',
  jwt: {
    secret: 'secret',
  },
  endpoints: {
    ping: true,
    search: true,
    login: true,
    adduser: true,

    package: {
      get: true,
      publish: true,
    },
  },
}
```

### [Architecture](./docs/architecture.md)
