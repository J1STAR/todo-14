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
  const { boardId } = (req.params as unknown) as CreateColumnRequestParams
  const { name, previousColumnId } = req.body as CreateColumnRequestBody

  // If one or many of the requested data are missing,
  // consider the request as a bad request
  if (
    boardId === undefined ||
    boardId === null ||
    !(name && name.length > 0 && name.trim().length > 0) ||
    previousColumnId === undefined ||
    previousColumnId === null
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

  res.json({ column })
})

export { router as createAColumnRouter }
