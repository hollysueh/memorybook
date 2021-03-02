//Delete page from photo album
module.exports = function(app) {
  const page = require('../controllers/photoAlbum.controller.js');
  app.delete('/deletePage', page.deletePage);
}

//Export for use in ./controllers/photoAlbum.controller.js