import React, { Component } from 'react';
import '../App.css';

//Render Landing Page
class Landing extends Component {
  render() {
    return (
      <div className="App">
        <h1 id="landingHeader">Memory Book</h1>
        <p className="landingSubHead">A 100% free virtual photo album maker.</p>
        <p className="landingSubHead"><a href="/CreateAccount">Click here</a> to get started.</p>
      </div>
    );
  }
}

export default Landing;