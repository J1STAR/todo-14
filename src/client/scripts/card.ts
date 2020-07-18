import {
  generateCard,
  generateNewCardForm,
  generateEditCardForm,
} from './html-generator'
import { parseContent } from '@/client/utils/content-parser'
import { eventCollector } from '@/client/utils/event-garbage-collector'

//  textarea 입력에 따라 카드추가 버튼 활성/비활성화
const createCardOkBtnClickHandler = (e) => {
  e.stopPropagation()
  const okBtn = document.querySelector('.card-btn.add')

  const value = e.target.value.trim()
  if (!value) {
    okBtn.setAttribute('disabled', 'true')
  } else {
    okBtn.removeAttribute('disabled')
  }
}

const editCardOkBtnClickHandler = (e) => {
  e.stopPropagation()
  const editBtn = document.querySelector('.card-btn.edit')

  const value = e.target.value.trim()
  if (!value) {
    editBtn.setAttribute('disabled', 'true')
  } else {
    editBtn.removeAttribute('disabled')
  }
}

// '새 카드 등록(+)' 버튼 클릭
const createCardFormHandler = (columnElm: HTMLElement) => {
  const cardContainerElem = columnElm.querySelector('.cards-container')

  const newCardFormElm = generateNewCardForm({ content: '' })
  const textAreaElm = newCardFormElm.querySelector('textarea')

  cardContainerElem.prepend(newCardFormElm)
  eventCollector.add(textAreaElm, 'keyup', createCardOkBtnClickHandler)
}

// '추가' 확인
const createCardHandler = (
  columnElm: HTMLElement,
  cardFormElm: HTMLElement
) => {
  const textAreaElm = cardFormElm.querySelector('textarea')
  const content = textAreaElm.value.trim()
  if (!content) return

  const cardContainerElem = columnElm.querySelector('.cards-container')

  // TODO: api로 id받아와서 넣어줄것
  const id = Math.floor(Math.random() * 1000)
  const newCardElm = generateCard({ id, content })

  cardFormElm.remove()
  cardContainerElem.prepend(newCardElm)

  eventCollector.remove(textAreaElm, 'keyup')
}

// '수정' 확인
const editCardHandler = (cardFormElm: HTMLElement) => {
  const textAreaElm = cardFormElm.querySelector('textarea')
  const content = textAreaElm.value.trim()
  if (!content) return

  const cardElm = document.querySelector('.card.hide')
  const [title, body] = parseContent(content)
  cardElm.querySelector('.card-title').textContent = title
  cardElm.querySelector('.card-body').textContent = body

  cardFormElm.remove()
  cardElm.classList.remove('hide')

  eventCollector.remove(textAreaElm, 'keyup')
}

// '취소'
const cancelCreateOrEditHandler = (cardFormElm: HTMLElement) => {
  cardFormElm.remove()

  document.querySelector('.card.hide')?.classList.remove('hide')
}

// '카드 수정(카드 클릭)'
const editCardFormHandler = (columnElm: HTMLElement, cardElm: HTMLElement) => {
  const title = cardElm.querySelector('.card-title').textContent
  const body = cardElm.querySelector('.card-body').textContent
  const content = [title, body].join('\n').trim()

  const newCardElm = generateEditCardForm({ content })
  const cardContainerElem = columnElm.querySelector('.cards-container')
  cardContainerElem.prepend(newCardElm)

  cardElm.classList.add('hide')

  const textAreaElm = newCardElm.querySelector('textarea')
  eventCollector.add(textAreaElm, 'keyup', editCardOkBtnClickHandler)
}

// '삭제'
const deleteCardHandler = (cardElm: HTMLElement) => {
  cardElm.remove()
}

window.addEventListener('click', (e) => {
  const target = e.target as HTMLElement

  const columnElm = target.closest('.column') as HTMLElement

  const cardElm = target.closest('.card') as HTMLElement
  const cardFormElm = target.closest('.card.new') as HTMLElement

  const createCardBtn = target.closest(
    '.action-btn.new-card-btn'
  ) as HTMLElement
  const deleteCardBtnElm = target.closest('.delete-card-btn') as HTMLElement

  const editOkBtn = target.closest('.card-btn.edit') as HTMLElement
  const createCardOKBtn = target.closest('.card-btn.add') as HTMLElement
  const cancelBtn = target.closest('.card-btn.cancel') as HTMLElement

  if (createCardBtn) {
    createCardFormHandler(columnElm)
    return
  }

  if (createCardOKBtn) {
    createCardHandler(columnElm, cardFormElm)
    return
  }

  if (editOkBtn) {
    editCardHandler(cardFormElm)
    return
  }

  if (cancelBtn) {
    cancelCreateOrEditHandler(cardFormElm)
    return
  }

  if (deleteCardBtnElm) {
    deleteCardHandler(cardElm)
    return
  }

  if (cardElm && !cardFormElm) {
    editCardFormHandler(columnElm, cardElm)
    return
  }
})
