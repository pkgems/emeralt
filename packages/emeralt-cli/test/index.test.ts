import test from 'ava'
import supertest from 'supertest'

test('ok', async (t) => {
  require('../src/index')

  await supertest('http://localhost:8080')
    .get('/-/ping')
    .expect(200)

  t.pass()
})
