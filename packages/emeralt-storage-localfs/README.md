# @emeralt/storage-localfs
Emeralt storage plugin to store package tarballs in local filesystem

## Install

Using npm:

```sh
npm install @emeralt/storage-localfs
```

or using yarn:

```sh
yarn add @emeralt/storage-localfs
```

## Usage

```ts
new EmeraltStorageLocalFS(options)
```

### Options

```ts
type Options = {
  // path where to store tarballs
  path: string
}
````
