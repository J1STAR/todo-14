import express from 'express'

import { getBoardsListRouter } from './get-boards-list'
import { createACardRouter } from './create-a-card'
import { modifyACardRouter } from './modify-a-card'

const router = express.Router()

router.use(getBoardsListRouter)
router.use(createACardRouter)
router.use(modifyACardRouter)

export { router as api }
