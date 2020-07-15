import express from 'express'
import { escape } from '../modules/escape'
import { query } from '../modules/query'

const router = express.Router()

// TODO: Create a middleware for validating
// board, column, card existence
// board <- column inclusion and
// user ownership
router.delete('/board/:boardId/column/:columnId', async ({ params }, res) => {
  const boardId = parseInt(params.boardId)
  const columnId = parseInt(params.columnId)

  if (!boardId || !columnId) {
    res.sendStatus(400)
    return
  }

  // TODO: Check user ownership
  const sql = `
    DELETE FROM \`column\`
    WHERE
    id=${escape(columnId)}
  `

  await query(sql)

  res.json({
    success: true,
  })
})

export { router as removeAColumnRouter }
