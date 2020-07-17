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
  <div class="column" data-column-index="${id}">
    <div class="column-header">
      <h2 class="column-name">${name}</h2>
      <div class="actions">
        <button class="action-btn new-card-btn">
          <i class="icon">plus</i>
        </button>
        <button class="action-btn delete-column-btn">
          <i class="icon">xmark</i>
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
  <div class="card" data-card-index="${id}">
    <h1 class="card-title">${title}</h1>
    <p class="card-body">${body}</p>
    <button class="delete-card-btn">DEL</button>
  </div>
  `

  return generateElement(cardHtml)
}
