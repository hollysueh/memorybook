const express = require('express');
const app = require('../app.js');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2
const { v4: uuidv4 } = require('uuid')
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

//Require Models
const Page = require('../models/albumPage.model.js');


//Get users photo album - all 'pages' with matching userID
//Export from ./routes/getAlbum.js
exports.getAlbum = function(req, res) {
  Page.find({ //find all documents with matching user ID
    userID: req.body.userID
    }, function(err, result) {
      if (err) { //if error send err msg
        console.log(err);
        res.status(500).send("Error fetching");
      } else if (!result.length) { //if no documents are found with matching userID send msg
          res.json("No records");
      } else { //if found documents with matching userID...
        res.send(result); //return list of 'pages' (documents) to client
      }
  });
}

//Add new page to photo album
//Export from ./routes/newPage.js
exports.addPage = function(req, res) {
  const pageID = uuidv4(); //create generic page ID using 'uuid' package
  // Create new page with users details
  let newPage = new Page({
    username: req.body.username,
    userID: req.body.userID,
    pageID: pageID,
    header: req.body.header,
    photoDesc: req.body.photoDesc
  });
  newPage.save(function(err, data) { //Save new page to DB
    if (err) { //if error send err msg
      console.log(err);
      res.status(500).send("Some error occurred while creating the record.");
    } else { //if successfully saved in DB...
      console.log(data);
      res.send(pageID); //return new page's 'pageID' to client
    }
  });
};

//Update existing page
//Export from ./routes/updatePage.js
exports.updatePage = function(req, res) {
    Page.findOneAndUpdate({ //find document with matching details
      username: req.body.username,
      userID: req.body.userID,
      pageID: req.body.pageID
     }, { header: req.body.header, photoDesc: req.body.photoDesc }, //if matching doc found, replace header and photoDesc with new values
      { new: true }, function(err, data) {
        if (err) { //if error send err msg
          console.log(err);
          res.send("Something wrong when updating record!");
        } else //if updated send success msg
          res.send("Successfully updated: " + data);
    });
}

//Delete page from DB
//Export from ./routes/deletePage.js
exports.deletePage = function(req, res) {
  Page.findOneAndRemove({ //find document with matching details, then delete
    username: req.body.username,
    userID: req.body.userID,
    pageID: req.body.pageID
  }, function(err, result) {
    if (err) { //if error send err msg
      console.log(err);
    } else if (!result) { //if can't find any matching documents, send msg that no records found
      res.send("err: Record does not exist.");
    } else //if deleted send success msg
      res.send("Record successfully removed");
  });
}
