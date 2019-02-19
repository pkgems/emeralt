import npmlog from 'npmlog'
import libnpm from 'libnpm'

export const createClient = (address: string) => {
  npmlog.level = 'silent'

  return (method: string, config = {}) => (...args) => {
    return libnpm[method](...args, {
      log: npmlog,
      // @ts-ignore
      registry: address,
      ...config,
    })
  }
}
