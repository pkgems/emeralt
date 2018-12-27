import chokidar from 'chokidar'
import { readFile } from 'fs-extra'
import { build } from './build'
import { getRootDir } from '../utils'

export const watch = async (pkg: string | void, options) => {
  await build(pkg, options)

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
    interval: 500,
  })

  const createBuilder = () => {
    let building = false
    let buildQueued = false

    const rebuild = async (queued = false) => {
      console.log('\nRebuilding', queued ? 'queued' : '')

      if (!building) {
        building = true
        try {
          await build(pkg, options)
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

  const builder = createBuilder()

  watcher.on('change', async (file) => {
    await builder()
  })
}
