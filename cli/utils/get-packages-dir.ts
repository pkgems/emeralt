import { join } from 'path'

export const getPackagesDir = () =>
  join(__dirname, '../../', 'packages')
