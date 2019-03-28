import test from 'ava'
import { jwtService } from '../jwt'

test('jwt', (t) => {
  const username = 'tester'
  // @ts-ignore
  const jwt = jwtService({
    config: {
      jwt: {
        secret: 'secret',
        expiresIn: 3600,
      },
    },
  })

  const token = jwt.sign({ username })

  t.deepEqual(jwt.verify(token).username, username)
})
