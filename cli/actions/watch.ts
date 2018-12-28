import chokidar from 'chokidar'
import { readFile } from 'fs-extra'
import { spawn } from 'child_process'
import { join } from 'path'
import { getRootDir } from '../utils'

const spawnBuild = () =>
  new Promise((resolve, reject) => {
    const proc = spawn(
      'node',
      [
        '--max_old_space_size=4096',
        join(__dirname, '../', 'index.js'),
        'build',
      ],
      {
        stdio: 'inherit',
      },
    )

    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject()
    })
  })

const createBuilder = () => {
  let building = false
  let buildQueued = false

  const rebuild = async (queued = false) => {
    console.log('\nRebuilding', queued ? 'queued' : '')

    if (!building) {
      building = true
      try {
        await spawnBuild()
      } catch (error) {
        console.error(error)
      }
      building = false

      if (buildQueued && !queued) {
        await rebuild(true)
      }

      building = false
    } else {
      console.log('Queuing build')
      buildQueued = true
    }
  }

  return rebuild
}

export const watch = async (pkg: string | void, options) => {
  await spawnBuild()

  const watcher = chokidar.watch('**/*', {
    cwd: getRootDir(),
    persistent: true,
    atomic: true,
    ignored: [
      ...(await readFile(`${getRootDir()}/.gitignore`, 'utf8')).split(
        '\n',
      ),
      'cli',
      'packages/*/test/**/*',
    ],
    interval: 100,
  })

  const builder = createBuilder()

  watcher.on('change', async (file) => {
    await builder()
  })
}
