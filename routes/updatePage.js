//Update page in photo album
module.exports = function(app) {
  const album = require('../controllers/photoAlbum.controller.js');
  app.put('/updatePage', album.updatePage);
}

//Export for use in ./controllers/photoAlbum.controller.js
