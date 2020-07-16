import express from 'express'

import { query } from '@/server/modules/query'
import { MysqlInsertOrUpdateResult } from '@/types/query'

const router = express.Router()

export type RemoveCardRequestParams = {
  boardId: number
  columnId: number
  cardId: number
}

router.delete(
  '/board/:boardId/column/:columnId/card/:cardId',
  async (req, res) => {
    const { cardId } = (req.params as unknown) as RemoveCardRequestParams

    const { affectedRows } = await query<MysqlInsertOrUpdateResult>(
      `DELETE FROM card WHERE id=${cardId}`
    )

    if (!affectedRows) {
      res.sendStatus(404)
      return
    }

    res.sendStatus(200)
  }
)

export { router as RemoveACardRouter }
