import { GetBoardDataResponseData } from '@/server/api/get-a-board-data'

export const getABoardDataAPI = async (
  boardId: number
): Promise<GetBoardDataResponseData['board']> => {
  const res = await fetch(`/board/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) return null

  const { board } = (await res.json()) as GetBoardDataResponseData

  return board
}
