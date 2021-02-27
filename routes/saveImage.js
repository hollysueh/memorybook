const express = require('express');
const router = express.Router();
const image = require('../controllers/image.controller.js');

//Add save image to Cloudinary (if existing image, overwrite)
router.post('/saveImage', image.uploadImage);

//Export for use in ./controllers/image.controller.js
module.exports = router;