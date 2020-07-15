import express from 'express'
import { createAColumnRouter } from './create-a-column'
import { modifyAColumnRouter } from './modify-a-column'
import { removeAColumnRouter } from './remove-a-column'

const router = express.Router()

router.use(createAColumnRouter)
router.use(modifyAColumnRouter)
router.use(removeAColumnRouter)

export { router as api }
