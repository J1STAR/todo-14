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
    const [listener] = this.eventListenersList.filter((l) => {
      return l.el === el && l.type === type
    })
    console.log(this.eventListenersList)
    console.log(listener)

    if (!listener) return

    el.removeEventListener(type, listener.handler)
  }
}

const eventCollector = new EventCollector()

export { eventCollector }
