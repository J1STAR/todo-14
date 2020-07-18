import express from 'express'

import { query } from '@/server/modules/query'

import { Board as BoardResponse } from '@/types/response'

const router = express.Router()

export type BoardResopnseData = BoardResponse & { authority: string }

export type GetBoardsListResponseData = {
  boards: BoardResopnseData[]
}

router.get('/board', async (req, res) => {
  // TODO: get from session
  const userId = 1

  // 가져올 컬럼을 여기서 셋팅하면 generic type은 어떻게...?
  const boards = await query<BoardResopnseData[]>(
    `SELECT b.id, b.name, b.createdAt, o.authority from user u
      JOIN ownership o ON u.id=o.userId
      JOIN board b ON o.boardId=b.id
      WHERE u.id=${userId}`
  )

  if (!boards.length) {
    res.sendStatus(404)
    return
  }

  const result: GetBoardsListResponseData = { boards }
  res.json(result)
})

export { router as getBoardsListRouter }
