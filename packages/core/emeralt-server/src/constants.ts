export const endpoints = {
  ping: '/-/ping',
  search: '/-/v1/search',
  login: '/-/v1/login',
  authenticate: '/-/user/:name',

  package: {
    get: '/:package_name',
    publish: '/:package_name',
  },
}
