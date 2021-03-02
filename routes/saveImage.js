//Add save image to Cloudinary (if existing image, overwrite)
module.exports = function(app) {
  const image = require('../controllers/image.controller.js');
  app.post('/saveImage', image.uploadImage);
} 

//Export for use in ./controllers/image.controller.js