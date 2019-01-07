import { TDist } from './dist'
import { TPackage } from './package'

export type TVersion = TPackage & {
  dist: TDist
}
