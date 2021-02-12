const express = require('express');
const app = express();
const helmet = require('helmet')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setup body-parser, cookie-parser, morgan
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json({limit: '50mb'})) //To enable body parser Middleware - limit added for Image upload
app.use(express.urlencoded({ limit: '50mb', extended: true })) //To enable body parser Middleware - limit added for Image upload
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

/*
//HELMET - Security Middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "unsafe-inline"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
*/

// Require routing rules
require('./routes/index.js')(app);
require('./routes/users.js')(app);
require('./routes/newUser.js')(app);
require('./routes/login.js')(app);
require('./routes/authorize.js')(app);
require('./routes/getAlbum.js')(app);
require('./routes/addPage.js')(app);
require('./routes/updatePage.js')(app);
require('./routes/deletePage.js')(app);
require('./routes/getImage.js')(app);
require('./routes/saveImage.js')(app);
require('./routes/deleteImage.js')(app);

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Connect to MongoDB Atlas database
const mongoUri = process.env.MONGODB_URL;
mongoose.Promise = global.Promise; 
mongoose.connect(mongoUri, {
	useMongoClient: true
});
mongoose.connection.on('error', function() {
	console.log('Connection to Mongo established.');
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});
mongoose.connection.once('open', function() {
  console.log("Successfully connected to MongoDB Atlas");
})

//Connect to Cloudinary database (for image storage)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

//Export for use in ./server.js
module.exports = app;
