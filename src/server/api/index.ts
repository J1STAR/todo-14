import express from 'express'
import { createAColumnRouter } from './create-a-column'
import { getABoardDataRouter } from './get-a-board-data'
import { modifyAColumnRouter } from './modify-a-column'
import { removeAColumnRouter } from './remove-a-column'

const router = express.Router()

router.use(createAColumnRouter)
router.use(modifyAColumnRouter)
router.use(removeAColumnRouter)

router.use(getABoardDataRouter)

export { router as api }
