const express = require('express')
const router = express.Router()
const User = require('../controllers/userController')
const upImage = require('../controllers/image')
const path = require('path')
const multer = require('multer')
const uploads = multer({ dest: path.join(__dirname, '../public/uploads') }).single('file')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', User.getUser)
router.get('/getUserId', User.getUserId)
router.post('/Login', User.Login)
router.post('/register', User.register)
router.post('/upswiperimage', uploads, upImage.upSwiperImage)
router.get('/seewiperimgage', upImage.seeSwiperImage)
router.post('/delwiperimgage', upImage.delSwiperImage)
router.post('/newUpSwiperImage', upImage.newUpSwiperImage)

module.exports = router
