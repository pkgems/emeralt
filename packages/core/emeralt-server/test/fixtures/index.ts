import { join } from 'path'
import { readdirSync } from 'fs-extra'

const packagesDir = join(__dirname, 'packages')

export const packagesFixtures = readdirSync(packagesDir).map((p) =>
  join(packagesDir, p),
)
