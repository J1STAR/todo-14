import { RemoveCardRequestParams } from '@/server/api/remove-a-card'

export const removeACardAPI = async ({
  urlParam,
}: {
  urlParam: RemoveCardRequestParams
}): Promise<boolean> => {
  const res = await fetch(
    `/board/${urlParam.boardId}/column/${urlParam.columnId}/card/${urlParam.cardId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return res.ok
}
