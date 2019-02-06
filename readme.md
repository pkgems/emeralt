![logo](./packages/misc/emeralt-assets/png/full-logo-3-medium.png)

[![Build Status](https://travis-ci.com/emeralt/emeralt.svg?branch=master)](https://travis-ci.com/emeralt/emeralt) 
[![Coverage Status](https://coveralls.io/repos/github/emeralt/emeralt/badge.svg?branch=master)](https://coveralls.io/github/emeralt/emeralt?branch=master)
![Open Issues](https://img.shields.io/github/issues-raw/emeralt/emeralt.svg)

---

### Introduction

Emeralt is the NPM registry with focus on high extensibility, simplicity and clean codebase written fully in TypeScript. Highly inspired by Verdaccio. Why not Verdaccio? The idea is to write it from scratch, avoiding all architectural problems of old codebase. <sup style="color: gray">(To be honest, I just hate Flow)</sup>

### Status
**Alpha**. Everything ~~might~~ **will** be changed.

### Goals
- High extensibility
- Reach plugins ecosystem
- Clean, elegant and explicit codebase
- Developer-frendly

### Contributions
Wanted! See Issues and Contribution Guidelines. Feel free to contact me at `stackdumper@gmail.com`

---

### Packages

##### Core
- [`@emeralt/cli`](./packages/core/emeralt-cli)
- [`@emeralt/server`](./packages/core/emeralt-server)
- [`@emeralt/types`](./packages/emeralt-types)

##### Auth Plugins
- [`@emeralt/auth-inmemory`](./packages/auth/emeralt-auth-inmemory)

##### Database Plugins
- [`@emeralt/database-inmemory`](./packages/database/emeralt-database-inmemory)
- [`@emeralt/database-redis`](./packages/database/emeralt-database-redis)
  
##### Storage Plugins
- [`@emeralt/storage-inmemory`](./packages/storage/emeralt-storage-inmemory)
  
##### Misc
- [`@emeralt/bundler`](./packages/misc/emeralt-bundler)
- [`@emeralt/assets`](./packages/misc/emeralt-assets)

---

### License

Emeralt is [MIT licensed](./LICENSE)

The Emeralt documentation and logos (e.g., `.md, .png, .svg` files) is [Creative Commons licensed](./LICENSE-assets).
