const express = require('express');
const router = express.Router();
const page = require('../controllers/photoAlbum.controller.js');

//Add new page to photo album
router.post('/addPage', page.addPage)

//Export for use in ./controllers/photoAlbum.controller.js
module.exports = router;