import { adduser } from './adduser'
import { TFixtures } from '../fixtures'

export const publish = async (
  fixtures: TFixtures,
  user: typeof fixtures.users[0],
  pkg: typeof fixtures.packages[0],
  version?,
) => {
  const { token } = await adduser(fixtures, user)

  if (version) {
    pkg.metadata.version = version
  }

  return fixtures.client('publish', { token })(pkg.metadata, pkg.tarball)
}
