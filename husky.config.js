module.exports = {
  hooks: {
    'commit-msg': `yarn commitlint -e $HUSKY_GIT_PARAMS`,
  },
}
