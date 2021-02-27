const express = require('express');
const router = express.Router();
const album = require('../controllers/photoAlbum.controller.js');

//Update page in photo album
router.put('/updatePage', album.updatePage);

//Export for use in ./controllers/photoAlbum.controller.js
module.exports = router;
