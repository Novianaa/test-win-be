const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth')
const uploadFotoProfile = require('../middlewares/uploadPhotoProfile')

router.post('/register', uploadFotoProfile, register)
router.post('/login', login)


module.exports = router
