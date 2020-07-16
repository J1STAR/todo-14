const newColumnBtn = document.querySelector('.column.new') as HTMLDivElement

if (newColumnBtn) {
  newColumnBtn.addEventListener('click', () => {
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

    newColumnBtn.parentElement.insertBefore(newColumnElm, newColumnBtn)

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
