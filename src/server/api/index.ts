import express from 'express'

import { getABoardDataRouter } from './get-a-board-data'
import { getBoardsListRouter } from './get-boards-list'

import { createAColumnRouter } from './create-a-column'
import { modifyAColumnRouter } from './modify-a-column'
import { removeAColumnRouter } from './remove-a-column'

import { createACardRouter } from './create-a-card'
import { modifyACardRouter } from './modify-a-card'
import { RemoveACardRouter } from './remove-a-card'

const router = express.Router()

router.use(getABoardDataRouter)
router.use(getBoardsListRouter)

router.use(createAColumnRouter)
router.use(modifyAColumnRouter)
router.use(removeAColumnRouter)

router.use(createACardRouter)
router.use(modifyACardRouter)
router.use(RemoveACardRouter)

export { router as api }
