#!/usr/bin/env node

import prog from 'commander'
import { build } from './actions'

prog
  .command('build')
  .description('Build a package')
  .option('-c, --cwd <cwd>', 'Working directory')
  .option('-m, --minify', 'Minify')
  .option('-s, --sourceMap', 'Enable sourcemap', true)
  .option('-i, --includeDependencies', 'Include dependencies')
  .action(build)

prog.parse(process.argv)
