import { connection } from './connection'

const query = <T>(query: string): Promise<T> => {
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
