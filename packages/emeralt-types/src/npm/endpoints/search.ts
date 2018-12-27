export const RegistrySearchEndpoint = '/-/v1/search'

export type TRegistrySearchQuery = {
  text?: string
  size?: number
  from?: number
  quality?: number
  popularity?: number
  maintenance?: number
}

export type TRegistrySearchResponseBody = {
  objects: any[]
  total: number // objects.length
  time: string // date
}
