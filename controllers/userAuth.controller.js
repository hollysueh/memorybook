const express = require('express');
const app = require('../app.js');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid')

//Require Models
const User = require('../models/user.model.js');


//Create new user account
//Export from ./routes/newUser.js
exports.createUser = function(req, res) {
  User.find({ //Find if existing user with same username/email already exists
    username: req.body.user,
    email: req.body.email
  }, function(err, result) {
    if (!result.length) { //If can't find any users with matching login details...
      const genID = uuidv4(); //create generic user ID using 'uuid' package
      // Create new user
      let newUser = new User({
        username: req.body.user,
        email: req.body.email,
        password: req.body.pwd,
        userID: genID,
        admin: true
      });
      //Save new user as document in 'userAccounts' collection
      newUser.save(function(err, data) {
        if (err) { //If error send err msg
          console.log(err);
          res.status(500).send("Some error occurred.");
        } else { //If successful send success msg
          console.log(data);
          res.send('The record has been added');
        }
      });
    } else if (err) { //If error while trying to find user with matching login details...
      console.log(err);
      res.status(500).send("Some error occurred.");
    } else { //If found user with matching login details...
      res.json('User already exists'); //alert user there is existing account
      }
  });
}

//Authentication endpoint - login existing user
//Export from ./routes/login.js
exports.login = function(req, res) {
  User.findOne({ //Verify that user has an existing account
    username: req.body.user,
    email: req.body.email,
    password: req.body.pwd
  }, function(err, result) {
    if (err) { //If error while trying to find document
      console.log(err);
      res.status(403).json("err: Failed to find") //return error msg
    } else if (!result) { //If can't find user's login details...
      res.status(403).json("err: Incorrect login") //alert user the login information is incorrect
    } else { //If found user's login details in 'userAccounts' collection...
    //Create authentication token
      payload = {
        'username': req.body.user, //payload with user's name + ID
        'userID': result.userID
      }
      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: "HS256"}) //token
      res.json({token: token, userID: result.userID}); //send token to client
    } 
  });
}

//Resource endpoint - authorize user's token
//Export from ./routes/authorize.js
exports.authorize = function(req, res) {
  const auth = req.headers['authorization']
  const token = auth.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) //decode user token
    res.send({username: decoded.username, userID: decoded.userID}) //return decoded username + userID to client
  } catch (err) { //If error decoding token...
    console.log(err);
    res.status(401).json("err: Bad JWT!"); //alert user bad JWT
  }
}
