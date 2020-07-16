const newColumnBtn = document.querySelector('.column.new') as HTMLDivElement

if (newColumnBtn) {
  newColumnBtn.addEventListener('click', async () => {
    const columnHtml = `
<div class="column">
  <div class="column-header">
    <h2 class="column-name">untitled column</h2>
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
    const newColumnElm = new DOMParser().parseFromString(
      columnHtml,
      'text/html'
    ).body.firstElementChild

    newColumnElm.className = 'column'

    // Insert the new column element
    newColumnBtn.parentElement.insertBefore(newColumnElm, newColumnBtn)

    fetch('/board/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // TODO: default to what?
        name: 'untitled column',
        // TODO: dynamically get the previous column id
        previousColumnId: 1,
      }),
    }).then((res) => {
      if (!res.ok) {
        alert('API Error')
        newColumnElm.parentElement.removeChild(newColumnElm)
      }
    })

    const columnNameElm = newColumnElm.querySelector(
      '.column-name'
    ) as HTMLHeadingElement

    columnNameElm.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        columnNameElm.removeAttribute('contenteditable')
      }
    })

    columnNameElm.addEventListener('blur', () => {
      console.log('blur')
      columnNameElm.removeAttribute('contenteditable')
    })

    columnNameElm.contentEditable = 'true'

    const columnNameRange = document.createRange()
    columnNameRange.setStartBefore(columnNameElm.firstChild)
    columnNameRange.setEndAfter(columnNameElm.firstChild)

    const sel = document.getSelection()

    sel.removeAllRanges()
    sel.addRange(columnNameRange)
  })
}
