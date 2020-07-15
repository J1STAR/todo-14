import { Column } from './column'
import { Card } from './card'

export type Activity = {
  id: number
  type: 'card' | 'column'
  column: Column | null
  card: Card | null
  occurredAt: string
}
