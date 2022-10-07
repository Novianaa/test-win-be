const Auth = require('../models/profile')
const helperWrapper = require('../helpers/helpers')

module.exports = {
  getProfile: async (req, res) => {
    try {
      const id = req.decodeToken.user_id
      const result = await Auth.profile(id)
      return helperWrapper.response(res, 200, 'Success get Profile', result.rows[0])
    } catch (err) {
      return helperWrapper.response(res, 400, `${err.message}`)
    }
  }
}