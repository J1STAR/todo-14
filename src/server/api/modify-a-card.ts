import express from 'express'

import { query } from '@/server/modules/query'
import { MysqlInsertOrUpdateResult } from '@/types/query'

const router = express.Router()

export type ModifyCardRequestParams = {
  boardId: number
  columnId: number
  cardId: number
}

export type ModifyCardRequestBody = {
  content: string
  icon: string
  columnId: number
  previousCardId: number
}

router.put(
  '/board/:boardId/column/:columnId/card/:cardId',
  async (req, res) => {
    const { cardId } = (req.params as unknown) as ModifyCardRequestParams
    const {
      content,
      icon,
      columnId,
      previousCardId,
    } = req.body as ModifyCardRequestBody

    // icon, previousCardId는 not null이 아니기 때문에 제외
    if (!content || !columnId) {
      res.sendStatus(404)
      return
    }

    const { affectedRows } = await query<MysqlInsertOrUpdateResult>(`UPDATE card
    SET content="${content}", icon="${icon}", columnId=${columnId}, previousCardId=${previousCardId}
    WHERE id=${cardId}`)

    if (!affectedRows) {
      res.sendStatus(404)
      return
    }

    res.sendStatus(200)
  }
)

export { router as modifyACardRouter }
