export interface EmeraltAuth {
  authenticate(
    username: string,
    password: string,
  ): Promise<string | void>

  addUser(username: string, password: string): Promise<boolean>

  removeUser(username: string, password: string): Promise<boolean>
}
