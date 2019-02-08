#!/usr/bin/env node

const { join } = require('path')
const { pathExistsSync } = require('fs-extra')

const BUILD_PATH = join(__dirname, '../build/bundler.js')

if (pathExistsSync(BUILD_PATH)) {
  require(BUILD_PATH)
} else {
  require('ts-node').register({
    cacheDirectory: join(__dirname, '../../../node_modules/.cache'),
  })
  require('./index.ts')
}
