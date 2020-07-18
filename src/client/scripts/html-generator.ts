import { parseContent } from '@/client/utils/content-parser'

export const generateElement = (html: string): HTMLElement => {
  const parser = new DOMParser()
  const newDoc = parser.parseFromString(html, 'text/html')

  return newDoc.body.firstElementChild as HTMLElement
}

export const generateColumn = ({
  id,
  name,
}: {
  id: number
  name: string
}): HTMLElement => {
  const columnHtml = `
  <div class="column" data-column-id="${id}">
    <div class="column-header">
      <h2 class="column-name">${name}</h2>
      <div class="actions">
        <button class="action-btn new-card-btn">
          <i class="icon add">plus</i>
        </button>
        <button class="action-btn delete-column-btn">
          <i class="icon delete">xmark</i>
        </button>
      </div>
    </div>
  
    <div class="cards-container"></div>
  </div>
  `

  return generateElement(columnHtml)
}

export const generateCard = ({
  id,
  content,
}: {
  id: number
  content: string
}): HTMLElement => {
  const [title, body] = parseContent(content)

  const cardHtml = `
  <div class="card" data-card-id="${id}">
    <h1 class="card-title">${title}</h1>
    <p class="card-body">${body}</p>
    <button class="delete-card-btn">
      <i class="icon delete">xmark</i>
    </button>
  </div>
  `

  return generateElement(cardHtml)
}

export const generateNewCardForm = ({
  content,
}: {
  content: string
}): HTMLElement => {
  const newCardForm = `
  <div class="card new">
    <textarea
      class="content"
      spellcheck="false"
      autocomplete="off"
    >${content}</textarea>
    <div class="buttons">
      <button class="card-btn add" disabled="true">추가</button>
      <button class="card-btn cancel">취소</button>
    </div>
  </div>
  `

  return generateElement(newCardForm)
}

export const generateEditCardForm = ({
  content,
}: {
  content: string
}): HTMLElement => {
  const newCardForm = `
  <div class="card new">
    <textarea
      class="content"
      spellcheck="false"
      autocomplete="off"
    >${content}</textarea>
    <div class="buttons">
      <button class="card-btn edit" disabled="true">수정</button>
      <button class="card-btn cancel">취소</button>
    </div>
  </div>
  `

  return generateElement(newCardForm)
}
