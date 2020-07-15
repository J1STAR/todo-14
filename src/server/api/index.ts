import express from 'express'
import { createAColumnRouter } from './create-a-column'
import { modifyAColumnRouter } from './modify-a-column'

const router = express.Router()

router.use(createAColumnRouter)
router.use(modifyAColumnRouter)

export { router as api }
