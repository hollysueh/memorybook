import React, { Component } from 'react';
import '../App.css';

//Render FAQ page
class FAQs extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="pageHeading">Frequently Asked Questions</h1>
        <div className="FAQs">
          <h5 className="question">What is Memory Book?</h5>
          <p>Memory Book is a virtual photo album maker, designed to make creating photo albums simpler.</p>
          <p>Users are able to create a new virtual photo album, upload all their favourite photos, and share the link to their photo album with friends.</p>
          <p>The best part... Memory Book is 100% free!</p>
          <br></br>
          <h5 className="question">How do I create a photo album?</h5>
          <p>First, create a free Memory Book account <a href="/CreateAccount">here.</a></p>
          <p>Once you've created an account, go to 'My Memory Book' to start creating your photo album!</p>
          <ul>
            <li>To add a new page, click <i>'Add Page'</i> at the bottom of the screen.</li>
            <li>To add a new photo, click on the <i>'Upload Photo'</i> button on the page. From there you can upload photos from your local drive.</li>
            <li>To change a page header or a photo's description, click on the text and type in your text.</li>
            <li>Remember to save any changes by clicking the <i>'Save Page'</i> button at the bottom of the page.</li>
            <li>To cancel your changes so far, click the 'Cancel Changes' button at the bottom of the page.</li>
          </ul>
          <h5 className="question">How do I delete a page from my photo album?</h5>
          <p>To delete a page from your photo album, click <i>'Delete Page'</i> at the bottom of the page you want to delete.</p>
          <br></br>
          <h5 className="question">How do I share my photo album with friends?</h5>
          <p>To share your Memory Book with friends, first use the menu to go to 'My Memory Book'. Copy the link at the top of the page.</p>
          <p>You can now share this link with friends and family, and they will be able to view your memory book!</p>
          <br></br>
        </div>
        <p>Need some more help? Send us a query on our <a href="/Contact">Contact Page.</a></p>
      </div>
    );
  }
}

export default FAQs;