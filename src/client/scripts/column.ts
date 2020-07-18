async function modifyColumn({
  boardId,
  columnId,
  data,
}: {
  boardId: number
  columnId: number
  data: {
    name: string
    previousColumnId: number
  }
}) {
  const res = await fetch(`/board/${boardId}/column/${columnId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return res.ok
}

function onClickNewColumnBtn(newColumnBtn: HTMLElement) {
  const columnHtml = `
<div class="column">
  <div class="column-header">
    <h2 class="column-name" spellcheck>untitled column</h2>
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
  const newColumnElm = new DOMParser().parseFromString(columnHtml, 'text/html')
    .body.firstElementChild

  newColumnElm.className = 'column'

  const columnNameElm = newColumnElm.querySelector(
    '.column-name'
  ) as HTMLHeadingElement

  fetch('/board/1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: columnNameElm.textContent,
      // TODO: dynamically get the previous column id
      previousColumnId: 1,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        alert('API Error')
        newColumnElm.parentElement.removeChild(newColumnElm)

        return { column: null }
      }

      return res.json()
    })
    .then((data) => {
      const column = data.column

      if (!column) {
        return
      }

      newColumnElm.setAttribute('data-column-id', column.id)
      // Insert the new column element
      newColumnBtn.parentElement.insertBefore(newColumnElm, newColumnBtn)
      columnNameElm.contentEditable = 'true'
      const columnNameRange = document.createRange()
      columnNameRange.setStartBefore(columnNameElm.firstChild)
      columnNameRange.setEndAfter(columnNameElm.firstChild)

      const sel = document.getSelection()

      sel.removeAllRanges()
      sel.addRange(columnNameRange)
    })

  columnNameElm.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      columnNameElm.removeAttribute('contenteditable')
    }
  })

  columnNameElm.addEventListener('blur', async function bc() {
    columnNameElm.removeAttribute('contenteditable')
    window.getSelection().removeAllRanges()

    await modifyColumn({
      // TODO: use current board id
      boardId: 1,
      columnId: parseInt(newColumnElm.getAttribute('data-column-id')),
      data: {
        name: columnNameElm.textContent,
        previousColumnId: 1,
      },
    })

    columnNameElm.removeEventListener('blur', bc)
  })
}

// Remove a column

async function removeColumnHandler(columnElm: HTMLElement) {
  // TODO: use current board id
  const boardId = 1
  const columnId = parseInt(columnElm.getAttribute('data-column-id'))

  const nextSibling = columnElm.nextElementSibling
  const parentElement = columnElm.parentElement

  const res = await fetch(`/board/${boardId}/column/${columnId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    // Restore the column if removal fails
    parentElement.insertBefore(columnElm, nextSibling)

    return
  }

  parentElement.removeChild(columnElm)
}

window.addEventListener('click', async (e) => {
  const target = e.target as HTMLElement

  const deleteColumnBtn = target.closest('.action-btn.delete-column-btn')
  const newColumnBtn = target.closest('.column.new') as HTMLDivElement

  if (deleteColumnBtn) {
    const columnElm = deleteColumnBtn.closest('.column') as HTMLElement

    removeColumnHandler(columnElm)
  } else if (newColumnBtn) {
    onClickNewColumnBtn(newColumnBtn)
  }
})
