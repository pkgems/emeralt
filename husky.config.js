module.exports = {
  hooks: {
    'pre-commit': `yarn test`,
    'commit-msg': `yarn commitlint -E $HUSKY_PARAMS`,
  },
}
