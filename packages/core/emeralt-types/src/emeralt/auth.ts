import { IEmeraltPlugin } from './plugin'

export interface CEmeraltAuth {
  addUser(username: string, password: string): Promise<boolean>

  removeUser(username: string): Promise<boolean>

  comparePassword(username: string, password: string): Promise<boolean>
}

export interface IEmeraltAuth<C = {}> extends IEmeraltPlugin<CEmeraltAuth, C> {}
