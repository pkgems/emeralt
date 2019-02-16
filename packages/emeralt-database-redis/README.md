# @emeralt/database-redis
Emeralt database plugin to store packages in Redis

## Install

Using npm:
```sh
npm install --save-dev @emeralt/database-redis
```

or using yarn:
```sh
yarn add --dev @emeralt/database-redis
```

## Options

```ts
type Options = {
  // connection options
  redis?: RedisOptions

  // string to prefix paths with
  // allows to create isolated namespaces
  prefix?: string
}
```
