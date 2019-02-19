import { join } from 'path'
import { readdirSync, readFile } from 'fs-extra'
import casual from 'casual'
import { TUser, TMetadata } from '@emeralt/types'
import { Server } from 'http'
import { createTarStream } from '../utils'
import { createMockServer, createMockClient } from '../mocks'

const packagesDir = join(__dirname, 'packages')

export const packagesFixtures = readdirSync(packagesDir).map((p) =>
  join(packagesDir, p),
)

export const genFixtures = async (): Promise<{
  server: Server
  client: any
  users: TUser[]
  packages: {
    metadata: TMetadata
    tarball: Buffer
  }[]
}> => ({
  // @ts-ignore
  server: await createMockServer(),
  client: await createMockClient(),

  //
  users: [1, 2, 3].map(() => ({
    username: casual.username,
    password: casual.password,
    email: casual.email,
  })),

  // @ts-ignore
  packages: await Promise.all(
    ['package-1', 'package-2'].map(async (path) => ({
      metadata: JSON.parse(
        await readFile(join(__dirname, 'packages', path), 'utf8'),
      ),
      tarball: await createTarStream(join(__dirname, 'packages', path)),
    })),
  ),
})
