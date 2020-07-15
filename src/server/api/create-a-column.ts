import { Board, Column } from '@/types/schema'

import { MysqlInsertOrUpdateResult } from '@/types/query'
import { escape as esc } from '../modules/escape'
import express from 'express'
import { query } from '../modules/query'

const router = express.Router()

export type CreateColumnRequestParams = {
  boardId: number
}

export type CreateColumnRequestBody = {
  name: string
  previousColumnId: number
}

router.post('/board/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const name = req.body.name
  const previousColumnId = parseInt(req.body.previousColumnId)

  // If one or many of the requested data are missing,
  // consider the request as a bad request
  if (
    !boardId ||
    !(name && name.length > 0 && name.trim().length > 0) ||
    !previousColumnId
  ) {
    res.sendStatus(400)

    return
  }

  // Find the board corresponding to the requested `boardId`
  const board = (await query(
    `SELECT * FROM board WHERE id=${esc(boardId)}`
  )) as Board[]

  // If the board doesn't exist,
  // bad request
  if (board.length === 0) {
    res.sendStatus(400)

    return
  }

  // TODO: Check if the board is owned by the user in the session

  // Insert the column to the table
  const { insertId } = await query<MysqlInsertOrUpdateResult>(`
    INSERT INTO \`column\`
    (boardId, name, previousColumnId)
    VALUES
    (${esc(boardId)}, "${esc(name)}", ${esc(previousColumnId)})
  `)

  const [column] = await query<Column[]>(
    `SELECT * FROM \`column\` WHERE id=${insertId}`
  )

  if (!column) {
    res.sendStatus(500)
    return
  }

  // TODO: Create an activity after the creation

  res.json({ column })
})

export { router as createAColumnRouter }
