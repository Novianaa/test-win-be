const express = require("express")
const app = express()
const authRouter = require('./auth')
const profileRouter = require('./profile')
const productRouter = require('./product')
const { isLogin } = require('../middlewares/verifyAuth')


app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/product', isLogin, productRouter)

module.exports = app