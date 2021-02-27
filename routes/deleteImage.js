const express = require('express');
const router = express.Router();
const image = require('../controllers/image.controller.js');

//Delete image from Cloudinary
router.delete('/deleteImage', image.deleteImage);

//Export for use in ./controllers/image.controller.js
module.exports = router;