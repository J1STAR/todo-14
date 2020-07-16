import { connection } from './connection'

export const escape = (value: any) =>
  connection.escape(value, false, 'UTC+9:00')
