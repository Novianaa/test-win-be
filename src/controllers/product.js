const Product = require('../models/product')
const wrapperHelper = require('../helpers/helpers')
const fs = require('fs')
const moment = require('moment')

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, description, price } = req.body
      const photo = req.file ? req.file.filename : 'https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg'
      if (!name || !description || !price) {
        return wrapperHelper.response(res, 400, 'Fields must be filled')
      }
      const result = await Product.addProduct(name, description, price, photo)
      return wrapperHelper.response(res, 201, `Success add ${name}`, result)
    } catch (err) {
      return wrapperHelper.response(res, 400, `${err.message}`)
    }
  },
  getProduct: async (req, res) => {
    try {
      let { keyword = '', orderBy = '' || 'name', sortBy = '' || 'asc', page, limit } = req.query
      page = Number(page) || 1
      limit = Number(limit) || 100
      const offset = page * limit - limit
      let totalProduct = await Product.countProduct()
      totalProduct = totalProduct.rows[0].total
      const result = await Product.getProduct(keyword, orderBy, sortBy, limit, offset)
      const totalRow = result.rows.length
      const totalPage = Math.ceil(totalRow / limit)
      const data = result.rows
      const setResult = { data, totalRow, page, totalPage, totalProduct }
      if (!result.rows.length) {
        return wrapperHelper.response(res, 400, `Product not found`, [])
      }
      return wrapperHelper.response(res, 200, `Success get product`, setResult
      )
    } catch (err) {
      return wrapperHelper.response(res, 400, `${err.message}`, [])
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Product.getProductById(id)
      if (!result.rows.length) {
        return wrapperHelper.response(res, 404, `Product not found`, [])
      }
      return wrapperHelper.response(res, 200, `Success get product`, result.rows[0])
    } catch (err) {
      return wrapperHelper.response(res, 400, `${err.message}`)
    }
  },
  updateProduct: async (req, res) => {
    try {
      let { id } = req.params
      const productCheck = await Product.getProductById(id)
      if (!productCheck.rows.length) {
        return wrapperHelper.response(res, 404, `Product not found`, [])
      }

      let { name, description, price } = req.body
      name = name ? name : productCheck.rows[0].name
      description = description ? description : productCheck.rows[0].description
      price = price ? price : productCheck.rows[0].price

      let photo = req.file ? req.file.filename : productCheck.rows[0].photo
      if (name === productCheck.rows[0].name && description === productCheck.rows[0].description && price === productCheck.rows[0].price && photo === productCheck.rows[0].photo) {
        return wrapperHelper.response(res, 404, `Noting updated`, [])
      }
      if (photo !== productCheck.rows[0].photo) {
        fs.unlink(`public/products/${productCheck.rows[0].photo}`, (err) => {
          if (err) {
            return wrapperHelper.response(res, 404, `Error delete file`, [])
          }
        })
      }
      const result = await Product.updateProduct(name, description, photo, price, id)
      return wrapperHelper.response(res, 200, `Success update product`, result.rows)
    } catch (err) {
      return wrapperHelper.response(res, 404, `${err.message}`, [])

    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const checkProduct = await Product.getProductById(id)
      if (!checkProduct.rows.length) {
        return wrapperHelper.response(res, 404, `Product not found`, [])
      }
      fs.unlink(`public/products/${checkProduct.rows[0].photo}`, (err) => {
        if (err) {
          return wrapperHelper.response(res, 404, `Error delete file`, [])
        }
      })
      const result = await Product.deleteProduct(id)
      return wrapperHelper.response(res, 200, result)
    } catch (err) {
      return wrapperHelper.response(res, 404, `${err.message}`, [])

    }
  }

}