import test from 'ava'
import { interpolatePath } from '@/interpolate-path'

test('interpolatePath', (t) => {
  t.is(
    interpolatePath('it/:name', {
      name: 'works',
    }),
    'it/works',
  )
})
