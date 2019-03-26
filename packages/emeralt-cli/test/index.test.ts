import test from 'ava'
import supertest from 'supertest'
import { fork } from 'child_process'

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t))

test.serial('start built emeralt', async (t) => {
  const server = fork('build/index.js')

  await sleep(1000)

  await supertest('http://localhost:8080')
    .get('/-/ping')
    .expect(200)

  server.kill('SIGTERM')

  t.pass()
})

test.serial('start emeralt', async (t) => {
  require('../src/index')

  await sleep(1000)

  await supertest('http://localhost:8080')
    .get('/-/ping')
    .expect(200)

  // server.kill('SIGTERM')

  t.pass()
})
