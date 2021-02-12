import React, { Component } from 'react';
import '../App.css';

//Render About Page
class About extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="pageHeading">About</h1>
        <p>Memory Book is a virtual photo album maker, designed to make creating photo albums simpler.</p>
        <p>Users are able to create a new virtual photo album, upload all their favourite photos, and share the link to their photo album with friends.</p>
        <p>The best part... Memory Book is 100% free!</p>
        <br></br>
        <p>Get started now by <a href="/CreateAccount">creating an account.</a></p>
      </div>
    );
  }
}

export default About;