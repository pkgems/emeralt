require('ts-node').register({
  cache: true,
  cacheDirectory: '.cache/ts-node',
})

require('./cli.ts')
