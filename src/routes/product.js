const express = require('express')
const router = express.Router()
const { addProduct, getProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/product')
const uploadFotoProduct = require('../middlewares/uploadImageProduct')

router.post('/', uploadFotoProduct, addProduct)
router.get('/', getProduct)
router.get('/:id', getProductById)
router.patch('/:id', uploadFotoProduct, updateProduct)
router.delete('/:id', deleteProduct)



module.exports = router
