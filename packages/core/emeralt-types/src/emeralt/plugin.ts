import { TEmeraltServerConfig } from './server'

export interface IEmeraltPlugin<T, C = {}> {
  (pluginConfig: C): (serverConfig: TEmeraltServerConfig) => Promise<T> | T
}
