const { readFileSync } = require('fs')

const tsConfig = JSON.parse(readFileSync('../../tsconfig.json', 'utf8'))

// ava will fail otherwise
tsConfig.compilerOptions.module = 'commonjs'

require('ts-node').register(tsConfig)
require('tsconfig-paths').register()
