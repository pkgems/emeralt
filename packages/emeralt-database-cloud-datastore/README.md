# @emeralt/database-cloud-datastore
Emeralt database plugin to store packages in Google Cloud Datastore

## Install

Using npm:

```sh
npm install @emeralt/database-cloud-datastore
```

or using yarn:

```sh
yarn add @emeralt/database-cloud-datastore
```

## Usage

```ts
new EmeraltDatabaseCloudDatastore()
```

### Options

```ts
import { DatastoreOptions } from '@google-cloud/datastore'

interface Options extends DatastoreOptions {}
```

You can find a list of Cloud Datastore options [here](https://cloud.google.com/nodejs/docs/reference/datastore/3.0.x/Datastore).
