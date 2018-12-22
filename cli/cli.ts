import prog from 'commander'
import { init, build, clean } from './actions'
import { basename } from 'path'

prog
  .command('init <name> [template]')
  .description('Init a new package')
  .action(init)

prog
  .command('build')
  .description('Build package')
  .option('-m, --minify', 'Minify')
  .option('-s, --sourceMap', 'Enable sourcemap')
  .option('-i, --includeDependencies', 'Include dependencies')
  .action(build)

prog
  .command('clean [pkg]')
  .description('Clean a package')
  .action(clean)

prog.parse(process.argv)
