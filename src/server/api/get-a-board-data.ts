import express from 'express'
import { escape } from '../modules/escape'
import { query } from '../modules/query'

const router = express.Router()

type GetBoardDataResponseData = {
  board: {
    id: number
    name: string
    columns: {
      id: number
      name: string
      previousColumnId: number
      createdAt: string
      cards: {
        id: number
        content: string
        icon: string
        previousCardId: number
        createdAt: string
        editedAt: string
      }[]
    }[]
  }
}

router.get('/board/:boardId', async ({ params }, res) => {
  const boardId = parseInt(params.boardId)

  if (!boardId) {
    res.sendStatus(400)
    return
  }

  // TODO: !!! Use correct types

  const [board] = await query(`SELECT * FROM board WHERE id=${escape(boardId)}`)

  if (!board) {
    res.json({
      board: null,
    })
    return
  }

  const columns = (await query(
    `SELECT id, name, previousColumnId, createdAt from \`column\` WHERE boardId=${escape(
      boardId
    )}`
  )) as []

  for (const column of columns) {
    const cards = await query(
      `SELECT id, content, icon, previousCardId, createdAt, editedAt from card WHERE columnId=${
        (column as any).id
      }`
    )

    ;(column as any)['cards'] = cards
  }

  const responseData: GetBoardDataResponseData = {
    board: {
      ...board,
      columns,
    },
  }

  res.json(responseData)
})

export { router as getABoardDataRouter }
