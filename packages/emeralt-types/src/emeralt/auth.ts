export interface IEmeraltAuth {
  addUser(username: string, password: string): Promise<boolean>

  removeUser(username: string, password: string): Promise<boolean>

  comparePassword(
    username: string,
    password: string,
  ): Promise<boolean>
}
