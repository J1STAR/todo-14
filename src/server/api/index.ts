import { createAColumnRouter } from './create-a-column'
import express from 'express'

const router = express.Router()

router.use(createAColumnRouter)

export { router as api }
