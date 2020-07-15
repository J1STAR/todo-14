import { connection } from './connection'

const query = (query: string) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export { query }
