import { generateElement, generateColumn, generateCard } from './html-generator'

import { getBoardListAPI } from '@/client/api/get-boards-list'
import { getABoardDataAPI } from '@/client/api/get-a-board-data'
import { GetBoardDataResponseData } from '@/server/api/get-a-board-data'

const setBoardName = (id: number, name: string) => {
  const appElm = document.querySelector('.app') as HTMLElement
  const boardNameElm = document.querySelector('.board-name') as HTMLElement

  boardNameElm.innerText = name
  appElm.setAttribute('data-board-id', id.toString())
}

const render = (board: GetBoardDataResponseData['board']) => {
  const containerElm = generateElement(
    `<main class="columns-container"></main>`
  )

  board.columns.map((column) => {
    const { id, name, cards } = column
    const columnElm = generateColumn({ id, name })

    const cardsContainerElm = columnElm.querySelector('.cards-container')

    cards.reverse().map((card) => {
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

const init = async () => {
  const boards = await getBoardListAPI()
  if (!boards?.length) return

  const boardData = await getABoardDataAPI(boards[0].id)
  if (!boardData) return

  setBoardName(boardData.id, boardData.name)
  render(boardData)
}

init()
