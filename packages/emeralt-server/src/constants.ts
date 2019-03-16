export const endpoints = {
  ping: '/-/ping',
  search: '/-/v1/search',
  login: '/-/v1/login',
  adduser: '/-/user/:name',

  package: {
    get: '/:package_name',
    getTarball: '/-/tarball/:package_name/:version',
    publish: '/:package_name',
  },

  distTags: {
    get: '/-/package/:package_name/dist-tags',
    create: '/-/package/:package_name/dist-tags/:dist_tag',
  },

  sys: {
    healthz: '/-/sys/healthz',
  },
}
