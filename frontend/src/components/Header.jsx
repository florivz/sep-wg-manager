import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <img src="./img/logo.png" className="img-fluid" alt="Responsive image" />
        </Navbar.Brand>
        <Nav className="d-flex">
          <Link to="/home" className="me-2">
            <button type="button" className="btn btn-secondary">
              Zurück
            </button>
          </Link>
          <Link to="/login">
            <button type="button" className="btn btn-secondary">
              Logout
            </button>
          </Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
