import { compile } from 'path-to-regexp'

export const interpolatePath = (path: string, params: Record<string, string>) =>
  compile(path)(params)
