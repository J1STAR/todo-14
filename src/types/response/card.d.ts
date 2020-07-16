import { User } from './user'

export type Card = {
  id: number
  user: User
  content: string
  icon: string
  previousCardId: number
  createdAt: string
  editedAt: string
}
