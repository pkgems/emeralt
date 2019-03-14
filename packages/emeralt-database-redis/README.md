# @emeralt/database-redis
Emeralt database plugin to store packages in Redis

## Install

Using npm:
```sh
npm install @emeralt/database-redis
```

or using yarn:
```sh
yarn add @emeralt/database-redis
```

## Usage

```ts
new EmeraltDatabaseRedis(options)
```

### Options

```ts
type Options = {
  // connection options
  redis?: RedisOptions

  // string to prefix paths with
  // allows to create isolated namespaces
  prefix?: string
}
```
