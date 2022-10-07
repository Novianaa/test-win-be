const express = require('express')
const router = express.Router()
const { getProfile } = require('../controllers/profile')
const uploadFotoProfile = require('../middlewares/uploadPhotoProfile')
const { isLogin } = require('../middlewares/verifyAuth')

router.get('/', isLogin, getProfile)

module.exports = router