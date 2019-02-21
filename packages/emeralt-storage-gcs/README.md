# @emeralt/storage-gcs
Emeralt storage plugin to store package tarball in Google Cloud Storage

## Install

Using npm:

```sh
npm install --save-dev @emeralt/storage-gcs
```

or using yarn:

```sh
yarn add --dev @emeralt/storage-gcs
```

## Usage

```ts
new EmeraltStorageGCS(options)
```

### Options

```ts
type Options = {
  // your GCP project ID
  projectId: string

  // path to auth key file (service account)
  keyFilename: string

  // storage bucket name
  bucket: string

  // dir inside of storage bucket to use
  dir: string
}
```
