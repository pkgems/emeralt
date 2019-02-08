import test from 'ava'
import supertest from 'supertest'
import { spawn } from 'child_process'

test('start server', async (t) => {
  require('../src/index')

  await supertest('http://localhost:8080')
    .get('/-/ping')
    .expect(200)

  t.pass()
})

test('start built server', async (t) => {
  const { status, body } = await new Promise(async (resolve) => {
    const server = spawn('node', ['build/index.js'])

    const { status, body } = await supertest('http://localhost:8080').get(
      '/-/ping',
    )

    server.kill('SIGTERM')
    server.on('close', () => {
      resolve({ status, body })
    })
  })

  t.is(status, 200)
  t.deepEqual(body, {})
})
