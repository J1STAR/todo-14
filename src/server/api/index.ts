import express from 'express'

import { getBoardsListRouter } from './get-boards-list'

import { createACardRouter } from './create-a-card'
import { modifyACardRouter } from './modify-a-card'
import { RemoveACardRouter } from './remove-a-card'

const router = express.Router()

router.use(getBoardsListRouter)

router.use(createACardRouter)
router.use(modifyACardRouter)
router.use(RemoveACardRouter)

export { router as api }
