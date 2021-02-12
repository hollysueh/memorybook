import React, { Component }from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

//Nav Dropdown (inside Header)
//userID passed from Header component, after user token authorised
class DropdownMenu extends Component {
  render() {
    return (
      <div className="App" id="styleDropdown">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"/>
        <Navbar className="navbar">
          <NavDropdown title="Menu" id="navDropdown" > 
            <NavDropdown.Item><Link to="/" className="dropdownLink">Home</Link></NavDropdown.Item><br></br>
            <NavDropdown.Item><Link to="/About" className="dropdownLink">About</Link></NavDropdown.Item><br></br>
            <NavDropdown.Item><Link to={`/PhotoAlbum/${this.props.userID}`} className="dropdownLink">My Memory Book</Link></NavDropdown.Item><br></br>
            <NavDropdown.Item><Link to="/FAQs" className="dropdownLink">FAQs</Link></NavDropdown.Item><br></br>
            <NavDropdown.Item><Link to="/Contact" className="dropdownLink">Contact Us</Link></NavDropdown.Item><br></br>
          </NavDropdown>
        </Navbar>
      </div>
    );
  }
}

export default DropdownMenu;
