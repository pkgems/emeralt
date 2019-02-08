#!/usr/bin/env node

import prog from 'commander'
import { build, watch } from './actions'

prog
  .command('build')
  .description('Build a package')
  .option('-c, --cwd <cwd>', 'Working directory')
  .option('-m, --minify', 'Minify')
  .option('-s, --sourceMap', 'Enable sourcemap', true)
  .option('-i, --includeDependencies', 'Include dependencies')
  .action(build)

prog
  .command('watch')
  .description('Watch a package')
  .option('-c, --cwd <cwd>', 'Working directory')
  .option('-m, --minify', 'Minify')
  .option('-s, --sourceMap', 'Enable sourcemap', true)
  .option('-i, --includeDependencies', 'Include dependencies')
  .action(watch)

prog.parse(process.argv)
