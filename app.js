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


// Setup body-parser, cookie-parser, morgan
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json({limit: '50mb'})) //To enable body parser Middleware - limit added for Image upload
app.use(express.urlencoded({ limit: '50mb', extended: true })) //To enable body parser Middleware - limit added for Image upload
app.use(cookieParser())

//HELMET - Security Middleware
app.use(
  helmet({
      contentSecurityPolicy: false,
  })
);

// Require routing rules
app.use('/api', require('./routes/newUser.js'))
app.use('/api', require('./routes/login.js'))
app.use('/api', require('./routes/authorize.js'))
app.use('/api', require('./routes/getAlbum.js'))
app.use('/api', require('./routes/addPage.js'))
app.use('/api', require('./routes/updatePage.js'))
app.use('/api', require('./routes/deletePage.js'))
app.use('/api', require('./routes/getImage.js'))
app.use('/api', require('./routes/saveImage.js'))
app.use('/api', require('./routes/deleteImage.js'))

//Connect to MongoDB Atlas database
const mongoUri = process.env.MONGODB_URL;
mongoose.Promise = global.Promise; 
mongoose.connect(mongoUri, {
	useUnifiedTopology: true,
  seNewUrlParser: true
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
