import { TEmeraltHandlerParams } from '@emeralt/types'
import { Router } from 'express'

// handlers
import { createDistTagHandler } from './create'
import { getDistTagsHandler } from './get'

export const distTagsHandler = (params: TEmeraltHandlerParams) =>
  Router()
    .use(createDistTagHandler(params))
    .use(getDistTagsHandler(params))
