const db = require('../helpers/db')

module.exports = {
  profile: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        delete result.rows[0].password
        resolve(result)
      })
    })
  }
}