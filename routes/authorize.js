//Authorize user token
module.exports = function(app) {
  const auth = require('../controllers/userAuth.controller.js');
  app.post('/auth', auth.authorize);
}

//Export for use in ./controllers/userAuth.controller.js