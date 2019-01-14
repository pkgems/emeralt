import { Person } from './person'
import { TVersion } from './version'

export type TMetadata = {
  name: string
  author: Person
  version: string

  main: string

  // all versions
  versions: {
    // "0.0.1": {}
    [version: string]: TVersion
  }

  // time when each version was uploaded
  time: {
    // "0.0.1": new Date().toString()
    [version: string]: string
  }

  // dist tags
  'dist-tags': {
    // "latest": "0.0.14"
    [tag: string]: string
  }

  dist: {
    [name: string]: {
      integrity: string
      shasum: string
      tarball: string
    }
  }

  _attachments?: {
    [name: string]: {
      content_type: string
      data: Buffer
    }
  }

  _owner: string // username (emeralt)

  [key: string]: any
}
