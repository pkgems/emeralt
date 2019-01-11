export const endpoints = {
  ping: '/-/ping',
  search: '/-/v1/search',
  login: '/-/v1/login',
  adduser: '/-/user/:name',

  package: {
    get: '/:package_name',
    getTarball: '/-/tarball/:name/:version',
    publish: '/:package_name',
  },
}
