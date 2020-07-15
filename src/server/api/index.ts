import express from 'express'

import { createACardRouter } from './create-a-card'

const router = express.Router()

router.use(createACardRouter)

export { router as api }
