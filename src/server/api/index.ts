import express from 'express'

import { getBoardsListRouter } from './get-boards-list'
import { createACardRouter } from './create-a-card'

const router = express.Router()

router.use(getBoardsListRouter)
router.use(createACardRouter)

export { router as api }
