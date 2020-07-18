import { generateElement, generateColumn, generateCard } from './html-generator'

import { GetBoardsListResponseData } from '@/server/api/get-boards-list'
import { GetBoardDataResponseData } from '@/server/api/get-a-board-data'

const getBoardList = async () => {
  const res = await fetch('/boards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) return

  const { boards } = (await res.json()) as GetBoardsListResponseData

  if (!boards.length) return

  await getBoardData(boards[0].id)

  // getBoardData()
}

const getBoardData = async (boardId) => {
  const res = await fetch(`/board/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) return

  const data = (await res.json()) as GetBoardDataResponseData

  render(data)
}

type Columns = GetBoardDataResponseData['board']['columns'][0]
type Cards = Columns['cards'][0]

const setBoardName = (id: number, name: string) => {
  const appElm = document.querySelector('.app') as HTMLElement
  const boardNameElm = document.querySelector('.board-name') as HTMLElement

  boardNameElm.innerText = name
  appElm.setAttribute('data-board-id', id.toString())
}

const render = ({ board }: GetBoardDataResponseData) => {
  setBoardName(board.id, board.name)

  const containerElm = generateElement(
    `<main class="columns-container"></main>`
  )

  board.columns.map((column) => {
    const { id, name, cards } = column
    const columnElm = generateColumn({ id, name })

    const cardsContainerElm = columnElm.querySelector('.cards-container')

    cards.map((card) => {
      const { id, content } = card

      const cardElm = generateCard({ id, content })
      cardsContainerElm.appendChild(cardElm)
    })

    columnElm.appendChild(cardsContainerElm)
    containerElm.appendChild(columnElm)
  })

  const addColumnElem = generateElement(
    `<div class="column new">
      <button><i class="icon">plus_app_fill</i></button>
      <p>Add a Column</p>
    </div>`
  )

  const spacerElm = generateElement(`<div class="column-spacer"></div>`)

  containerElm.appendChild(addColumnElem)
  containerElm.appendChild(spacerElm)

  const app = document.querySelector('.app')
  app.appendChild(containerElm)
}

;(async () => {
  await getBoardList()
})()
