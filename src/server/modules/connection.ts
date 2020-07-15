import { config } from '@/config'
import mysql from 'mysql'

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PW,
  database: config.DB_NAME,
})

export { connection }
