type eventHandler = (e: Event) => void

type eventListener = {
  el: HTMLElement
  type: string
  handler: eventHandler
}

class EventCollector {
  eventListenersList: eventListener[] = null

  constructor() {
    this.eventListenersList = []
  }

  add = (el: HTMLElement, type: string, handler: eventHandler) => {
    el.addEventListener(type, handler)

    this.eventListenersList.push({ el, type, handler })
  }

  remove = (el: HTMLElement, type: string) => {
    const idx = this.eventListenersList.findIndex((l) => {
      return l.el === el && l.type === type
    })

    if (idx < 0) return

    el.removeEventListener(type, this.eventListenersList[idx].handler)

    this.eventListenersList.splice(idx, 1)
  }
}

const eventCollector = new EventCollector()

export { eventCollector }
