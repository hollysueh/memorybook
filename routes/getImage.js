const express = require('express');
const router = express.Router();
const image = require('../controllers/image.controller.js');

//Get image from Cloudinary
router.post('/getImage', image.getImage);

//Export for use in ./controllers/image.controller.js
module.exports = router;