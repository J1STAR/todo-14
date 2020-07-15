export type Card = {
  id?: number
  columnId?: number
  userId?: number
  content?: string
  icon?: string
  previousCardId?: number
  createdAt?: string
  editedAt?: string
  isDeleted?: 0 | 1
}
