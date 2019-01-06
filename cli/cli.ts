import prog from 'commander'
import { init, build, watch } from './actions'

prog
  .command('init <name> [template]')
  .description('Init a new package')
  .action(init)

prog
  .command('build [pkg]')
  .description('Build package')
  .option('-m, --minify', 'Minify')
  .option('-s, --sourceMap', 'Enable sourcemap', true)
  .option('-i, --includeDependencies', 'Include dependencies')
  .action(build)

prog
  .command('watch [pkg]')
  .description('Watch package')
  .option('-m, --minify', 'Minify')
  .option('-s, --sourceMap', 'Enable sourcemap', true)
  .option('-i, --includeDependencies', 'Include dependencies')
  .action(watch)

prog.parse(process.argv)
