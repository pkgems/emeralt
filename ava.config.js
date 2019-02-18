import { resolve } from 'path'

export default ({ projectDir }) => ({
  compileEnhancements: false,
  extensions: ['ts'],
  // relative to project directory
  require: [resolve(projectDir, '../../', 'test/register')],
  sources: ['src/**/*'],
})
