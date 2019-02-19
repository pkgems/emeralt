export type OptionalPromise<T> = T | Promise<T>

export type Optional<T> = { [P in keyof T]?: T[P] }

/** convert all keys to one type */
export type Uniform<T, N> = { [P in keyof T]?: N }

/** get return type of function, resolve a promise, etc */
export type Unpack<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T
