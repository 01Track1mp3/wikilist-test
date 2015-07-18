import React from 'react';
import Router from 'react-router';
import {Row, Navbar, Nav} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';
var {RouteHandler} = Router;

// import Menu from '../Components/Menu';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar brand='Wikilist Tester'>
          <Nav>
            <NavItemLink to="home" eventKey={1}>Validation</NavItemLink>
            <NavItemLink to="testing" eventKey={2}>Testing</NavItemLink>
            <NavItemLink to="upload" eventKey={2}>Upload</NavItemLink>
          </Nav>
        </Navbar>
        <div className='container'>
          <Row>
            <RouteHandler/>
          </Row>
        </div>
      </div>
    );
  }
}

module.exports = App;
