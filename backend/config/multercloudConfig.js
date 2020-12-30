const cloudinary = require('cloudinary').v2
const multer = require('multer')
const Datauri = require('datauri/parser')
const path = require('path')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_HOST,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = multer.memoryStorage()

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const parser = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})
const multerUpload = parser.single('image')

const dUri = new Datauri()
/*
@description This function converts the buffer to data url
@param {Object} req containing the field object
@returns {String} The data url from the string buffer
*/
const datauri = (req) =>
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)

module.exports = { multerUpload, datauri, cloudinary }
