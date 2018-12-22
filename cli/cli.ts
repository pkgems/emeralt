import prog from 'commander'
import { init, build } from './actions'

prog
  .command('init <name> [template]')
  .description('Init a new package')
  .action(init)

prog
  .command('build')
  .description('Build package')
  .option('-m, --minify', 'Minify')
  .option('-s, --sourceMap', 'Enable sourcemap')
  .action(build)

prog.parse(process.argv)
