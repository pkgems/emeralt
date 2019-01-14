import { IEmeraltDatabase } from '@emeralt/types'
import { path, keys, assocPath, dissocPath, mergeDeepLeft } from 'ramda'

export const EmeraltDatabaseInMemory: IEmeraltDatabase = () => () => {
  let storage = {}

  return {
    getKey: (k) => path(k, storage),

    hasKey: (k) => !!path(k, storage),

    listKeys: (k) => ((keys(path(k, storage)) as unknown) as string[]) || [],

    setKey: (k, v) => (storage = assocPath(k, v, storage)) && true,

    createKey: (k, v) =>
      path(k, storage) // check if exists
        ? false // false if yes
        : (storage = assocPath(k, v, storage)) && true, // create if not

    updateKey: (k, v) =>
      path(k, storage)
        ? (storage = assocPath(
            k,
            mergeDeepLeft(v, path(k, storage)),
            storage,
          )) && true
        : false,

    deleteKey: (k) =>
      path(k, storage) // check if exists
        ? (storage = dissocPath(k, storage)) && true // delete if yes
        : false, // false if not
  }
}
