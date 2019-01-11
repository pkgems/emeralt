import { Server } from 'http'
import { AddressInfo } from 'net'

export const getAddress = (server: Server) => {
  const addr = server.address() as AddressInfo

  if (!addr) {
    throw new Error('Unable to get server address. Did you call .listen()?')
  }

  return `http://localhost:${addr.port}`
}
