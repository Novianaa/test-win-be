const db = require('../helpers/db')

module.exports = {
  addProduct: (name, description, price, photo) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO products(name, description, price, photo) VALUES('${name}',  '${description}', '${price}','${photo}')`, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve({ name, description, price, photo })
      })
    })
  },
  getProduct: (keyword, orderBy, sortBy, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE name LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortBy} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (err) {
          reject(err.message)
        }
        resolve(result)
      })
    })
  },
  countProduct: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM products`, (err, result) => {
        if (err) {
          reject(`${err.message}`)
        }
        resolve(result)
      })
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err.message)
        }
        resolve(result)
      })
    })
  },
  updateProduct: (name, description, photo, price, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE products SET name='${name}', description='${description}', photo='${photo}',  price='${price}',updated_at=NOW() WHERE id = ${id} RETURNING *`, (err, result) => {
        if (err) {
          reject(`${err}`)
        }
        resolve({
          id,
          ...result,
        })
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM products WHERE id=${id}`, (err) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(`Success delete product id ${id}`)
      })
    })
  }
}