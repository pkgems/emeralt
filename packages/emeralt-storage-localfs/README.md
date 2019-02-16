# @emeralt/storage-localfs
Emeralt storage plugin to store package tarballs in local filesystem

## Install

Using npm:

```sh
npm install --save-dev @emeralt/storage-localfs
```

or using yarn:

```sh
yarn add --dev @emeralt/storage-localfs
```

## Usage

```ts
new EmeraltStorageLocalFS({
  // path where to store tarballs
  path: './storage'
})
