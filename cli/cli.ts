import prog from 'commander'
import { init, build, clean } from './actions'

prog
  .command('init <name> [template]')
  .description('Init a new package')
  .action(init)

prog
  .command('build [pkg]')
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
