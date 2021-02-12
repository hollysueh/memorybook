const chai = require('chai');
const expect = chai.expect;
const request = require('request')


// Check GET of users account details for login from MongoDB
describe('Check GET from MongoDB "userAccounts" works correctly', function() {
  describe ('Get users login account details', function() {
    it('Content returns a string', function(done) {
      request('http://localhost:8080/login',
        function(error, response, body) {
          expect (body).to.be.a('string');
          done();
        });
    });
  });
});

// Check GET of users photo album page (header + text) from MongoDB
describe('Check GET from MongoDB "albumPages" works correctly', function() {
  describe ('Get users photo album', function() {
    it('Content returns a string', function(done) {
      request('http://localhost:8080/getAlbum',
        function(error, response, body) {
          expect (body).to.be.a('string');
          done();
        });
    });
  });
});

// Check GET of users photo album image from Cloudinary
describe('Check GET from Cloudinary image works correctly', function() {
  describe ('Get users image', function() {
    it('Content returns a string', function(done) {
      request('http://localhost:8080/getImage',
        function(error, response, body) {
          expect (body).to.be.a('string');
          done();
        });
    });
  });
});

// Check app client home page loads correctly
describe('Check client home page successfully renders', function() {
  describe ('Page loads correctly', function() {
    it('status', function(done) {
      request('http://localhost:3000/',
      function(error, response, body) {
        expect (response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
