const express = require('express')
const path = require('path')
const router = express.Router()
const {
  multerUpload,
  datauri,
  cloudinary,
} = require('../config/multercloudConfig.js')

router.post('/', multerUpload, async (req, res) => {
  try {
    const file = datauri(req).content
    const result = await cloudinary.uploader.upload(file)
    res.send(result.secure_url)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
