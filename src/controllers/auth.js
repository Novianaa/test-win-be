const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Auth = require('../models/auth')
const helperWrapper = require('../helpers/helpers')

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, gender } = req.body
      const photo = req.file ? req.file.filename : 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
      if (!name || !gender || !email || !password) {
        return helperWrapper.response(res, 404, 'Fields must be filled')
      }
      if (password.length < 8) {
        return helperWrapper.response(res, 404, 'Password must be more than 8 characters')
      }
      const result = await Auth.register(name, email, password, gender, photo)
      return helperWrapper.response(res, 201, 'Success create new acount', result)
    } catch (err) {
      return helperWrapper.response(res, 400, `${err.message}`)
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body
      if (!email || !password) {
        return helperWrapper.response(res, 404, 'Fields must be filled')
      }
      email = email.toLowerCase()
      const result = await Auth.login(email)
      if (result.rows.length < 1) {
        return helperWrapper.response(res, 404, 'Acount not registed')
      }
      if ((await bcrypt.compare(password, result.rows[0].password)) == false) {
        return helperWrapper.response(res, 400, "Wrong Password")
      }
      const token = jwt.sign({ user_id: result.rows[0].id, email: result.rows[0].email, name: result.rows[0].name, photo: result.rows[0].photo }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1 day'
      })
      return helperWrapper.response(res, 201, 'Success login', {
        user_id: result.rows[0].id,
        email: result.rows[0].email,
        name: result.rows[0].name,
        photo: result.rows[0].photo,
        token
      })

    } catch (err) {
      return helperWrapper.response(res, 404, ` ${err.message}`)
    }
  }
}