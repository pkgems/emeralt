export class EmeraltAuth {
  async authenticate(
    username: string,
    password: string,
  ): Promise<string | void> {
    return null
  }

  async addUser(username: string, password: string): Promise<boolean> {
    return false
  }

  async removeUser(username: string, password: string): Promise<boolean> {
    return false
  }
}
