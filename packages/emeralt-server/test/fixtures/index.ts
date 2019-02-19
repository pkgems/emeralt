import { TUser, TMetadata, Unpack } from '@emeralt/types'
import { Readable } from 'stream'
import { Server } from 'http'
import { join } from 'path'

import { createPackage } from './packages'
import { createServer } from './server'
import { createClient } from './client'
import { createUser } from './user'
import { AddressInfo } from 'net'

export type TFixtures = Unpack<ReturnType<typeof createFixtures>>

export const createFixtures = async (): Promise<{
  address: string
  server: Server
  client: Unpack<typeof createClient>
  users: TUser[]
  packages: {
    metadata: TMetadata
    tarball: Readable
  }[]
}> => {
  const pkgsDir = join(__dirname, 'packages')

  // generate 3 users
  const users = [1, 2, 3].map(createUser)

  // create fully in-memory server
  const server = await createServer(users)

  // get server address
  const address = `http://localhost:${(server.address() as AddressInfo).port}`

  // create libnpm wrapper
  const client = await createClient(address)

  // generate two package (manifests + tarballs)
  const packages = await Promise.all(
    ['package-1', 'package-2'].map(createPackage),
  )

  return {
    address,
    server,
    client,
    users,
    packages,
  }
}
