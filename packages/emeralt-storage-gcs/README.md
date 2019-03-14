# @emeralt/storage-gcs
Emeralt storage plugin to store package tarball in Google Cloud Storage

## Install

Using npm:

```sh
npm install @emeralt/storage-gcs
```

or using yarn:

```sh
yarn add @emeralt/storage-gcs
```

## Usage

```ts
new EmeraltStorageGCS(options)
```

### Options

```ts
type Options = {
  // @google-cloud/storage options
  // https://www.npmjs.com/package/@google-cloud/storage
  storage: StorageOptions

  path: {
    // bucket to use
    // default: emeralt-test
    bucket: string

    // prefix (for example, my/dir/prefix)
    prefix?: string
  }
}

```
