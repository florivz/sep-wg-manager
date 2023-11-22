import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Header(props) {
  return (

    <Navbar variant="dark" style={{backgroundColor: 'rgb(13, 110, 253)'}}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Navbar.Brand>
          <img src={logo} className="img-fluid logo-size" alt="Responsive image" />
        </Navbar.Brand>
        <Nav className="d-flex">
          <Link to="/home" className="me-2">
            <button type="button" className="btn-lg btn btn-primary">
            Zurück <i className="bi bi-box-arrow-left"></i>
            </button>
          </Link>
          <Link to="/login">
            <button type="button" className="btn-lg btn btn-danger">
            <i className="bi bi-box-arrow-left"></i>
            </button>
          </Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
