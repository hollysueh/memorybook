//Delete image from Cloudinary
module.exports = function(app) {
  const image = require('../controllers/image.controller.js');
  app.delete('/deleteImage', image.deleteImage);
} 

//Export for use in ./controllers/image.controller.js