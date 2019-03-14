# @emeralt/database-mongodb
Emeralt database plugin to store packages in MongoDB

## Install

Using npm:

```sh
npm install @emeralt/database-mongodb
```

or using yarn:

```sh
yarn add @emeralt/database-mongodb
```

## Usage

```ts
new EmeraltDatabaseMongoDB(options)
```


### Options

```ts
type Options = {
  // mongodb connection URI
  uri?: string

  // indexing configuration
  // by default, indexing is enabled (indexing property is undefined)
  // but it can be disabled explicitly by setting indexing to false
  indexing?:
    | {
        metadatas: boolean
        versions: boolean
        options?: IndexOptions
      }
    | false
}
```
