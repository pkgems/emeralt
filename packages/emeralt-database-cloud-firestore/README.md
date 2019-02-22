# @emeralt/database-cloud-firestore
Emeralt database plugin to store packages in Google Cloud Firestore

## Install

Using npm:

```sh
npm install --save-dev @emeralt/database-cloud-firestore
```

or using yarn:

```sh
yarn add --dev @emeralt/database-cloud-firestore
```

## Usage

```ts
new EmeraltDatabaseCloudFirestore(options)
```

### Options

```ts
type Options = {
  prefix?: {
    collection: string // default: emeralt-test
    document: string // default: emeralt-test
  },

  // credentials for firestore
  // https://cloud.google.com/compute/docs/access/service-accounts
  firestore?: {
    projectId?: string
    keyFilename?: string
    credentials?: string
    timestampsInSnapshots?: string
  },
}
```
