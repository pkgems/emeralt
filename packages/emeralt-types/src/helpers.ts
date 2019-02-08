export type OptionalPromise<T> = T | Promise<T>

export type Optional<T> = { [P in keyof T]?: T[P] }
