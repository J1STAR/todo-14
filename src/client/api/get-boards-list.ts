import { GetBoardsListResponseData } from '@/server/api/get-boards-list'

export const getBoardListAPI = async (): Promise<
  GetBoardsListResponseData['boards']
> => {
  const res = await fetch('/board', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) return null

  const { boards } = (await res.json()) as GetBoardsListResponseData

  return boards
}
