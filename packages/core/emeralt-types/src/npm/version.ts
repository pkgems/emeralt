import { TDist } from './dist'
import { TMetadata } from './metadata'

export type TVersion = TMetadata & {
  dist: TDist

  [key: string]: any
}
