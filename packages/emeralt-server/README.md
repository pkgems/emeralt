# @emeralt/server
Emeralt Node.js HTTP server module

---

### Install

Using npm:

```sh
npm install @emeralt/server
```

or using yarn:

```sh
yarn add @emeralt/server
```

---

### Example

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

##### Config

```ts
type TEmeraltServerConfig = {
  // server url, used as tarballs url
  url: string

  // default: "development"
  logLevel?: 'silent' | 'development' | 'production'

  // jsonwebtoken options
  jwt?: {
    // default: "secret"
    secret?: string

    // default: "7d"
    expiresIn?: string | number
  }

  // execute healtcheck in initialization
  // default: true
  initialHealthcheck?: boolean

  // enable specific endpoint
  // default: all true
  endpoints?: {
    ping?: boolean
    search?: boolean
    login?: boolean
    adduser?: boolean
    package?: {
      get?: boolean
      publish?: boolean
    }
    distTags?: {
      get?: boolean
      create?: boolean
      delete?: boolean
    }
    sys?: {
      healthz: boolean
    }
  }
}
```
---

### Healthcheck

Additionally, server exposes a healthcheck endpoint, which verifies that every plugin is healthy and able to serve the needs.

##### Endpoint
`GET /-/sys/health`

##### Response status
`200` if ok, `503` otherwise.

##### Response body:
```ts
type Response = {
  ok: boolean // true if every plugin is healthy
  healthz: {
    auth: THealthz,
    database: THealthz,
    storage: THealthz,
  }
}

type THealthz = {
  ok: boolean
  message?: string
  error?: Error
} 
```

---

### [Architecture](./docs/architecture.md)
