require('ts-node').register({
  cache: true,
  cacheDirectory: '.cache/ts-node',
  max_old_space_size: 8192,
})

require('./cli.ts')
