import { TEmeraltHandlerParams } from '@emeralt/types'
import { Router } from 'express'

// handlers
import { createDistTagHandler } from './create'
import { getDistTagsHandler } from './get'
import { deleteDistTagHandler } from './delete'

export const distTagsHandler = (params: TEmeraltHandlerParams) =>
  Router()
    .use(getDistTagsHandler(params))
    .use(createDistTagHandler(params))
    .use(deleteDistTagHandler(params))
