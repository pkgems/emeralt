import test from 'ava'
import { jwtService } from '../jwt'

test('jwt', (t) => {
  const name = 'tester'
  const jwt = jwtService({
    // @ts-ignore
    config: {
      jwt: {
        secret: 'secret',
      },
    },
  })

  const token = jwt.sign({ name })

  t.deepEqual(jwt.verify(token).name, name)
})
