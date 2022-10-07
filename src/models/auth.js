const db = require('../helpers/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  register: (name, email, password, gender, photo) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashed) => {
        if (err) {
          reject(new Error(`${err.message}`))
        } else {
          password = hashed
          db.query(`INSERT INTO users(name, email, password,gender,photo) VALUES('${name}',  '${email}', '${password}','${gender}','${photo}')`, (err, result) => {
            if (err) {
              if (err.code === '23505') {
                reject(new Error('Email already exists!'))
              } else {
                reject(err.message,)
              }
            }
            resolve({ name, email, gender, photo })
          })
        }
      })
    })
  },
  login: (email) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
    })
  },
}
