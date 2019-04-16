![logo](./packages/emeralt-assets/png/full-logo-3-medium.png)

![Travis (.com) branch](https://img.shields.io/travis/com/emeralt/emeralt/master.svg?style=for-the-badge)
![Coveralls github branch](https://img.shields.io/coveralls/github/emeralt/emeralt/master.svg?style=for-the-badge)

---

### Introduction

Emeralt is the NPM registry with focus on high extensibility, simplicity and clean codebase written fully in TypeScript. Highly inspired by Verdaccio. Why not Verdaccio? The idea is to write it from scratch, avoiding all architectural problems of old codebase.

### Status
**Beta**

### Goals
- High extensibility
- Reach plugins ecosystem
- Clean, elegant and explicit codebase
- Developer-frendly

### Contributions
Wanted! See Issues. Feel free to contact me at `stackdumper@gmail.com`

---

### Packages

- [`@emeralt/cli`](./packages/emeralt-cli)
- [`@emeralt/server`](./packages/emeralt-server)
- [`@emeralt/types`](./packages/emeralt-types)
- [`@emeralt/assets`](./packages/emeralt-assets)

##### <sup>Auth plugins</sup>

- [`@emeralt/auth-inmemory`](./packages/emeralt-auth-inmemory)

##### <sup>Database plugins</sup>

- [`@emeralt/database-inmemory`](./packages/emeralt-database-inmemory)
- [`@emeralt/database-redis`](./packages/emeralt-database-redis)
- [`@emeralt/database-mongodb`](./packages/emeralt-database-mongodb)
- [`@emeralt/database-cloud-firestore`](./packages/emeralt-database-cloud-firestore)
- [`@emeralt/database-cloud-datastore`](./packages/emeralt-database-cloud-datastore)

##### <sup>Storage plugins</sup>

- [`@emeralt/storage-inmemory`](./packages/emeralt-storage-inmemory)
- [`@emeralt/storage-localfs`](./packages/emeralt-storage-localfs)
- [`@emeralt/storage-gcs`](./packages/emeralt-storage-gcs)

---

### License

Emeralt is [MIT licensed](./LICENSE)

The Emeralt documentation and logos (e.g., `.md, .png, .svg` files) is [Creative Commons licensed](./LICENSE-assets).
