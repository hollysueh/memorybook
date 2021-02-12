const express = require('express')
const path = require('path');
const app = require('./app.js')

//For Heroku deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("memorybook-client/build"));
  app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "memorybook-client", "build", "index.html")); });
  }

//Listen on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
